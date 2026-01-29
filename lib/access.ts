import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies, headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export type UnlockState = {
  status: 'idle' | 'error' | 'success';
  message?: {
    title: string;
    detail: string;
  };
};

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ENTRIES = 10_000;
const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

async function getClientIdentifier(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for');
  const realIp = requestHeaders.get('x-real-ip');
  const rawIp = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
  return rawIp;
}

async function isRateLimited(): Promise<boolean> {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size > RATE_LIMIT_MAX_ENTRIES) {
    const entries = Array.from(rateLimitStore.entries()).sort(
      (a, b) => a[1].resetAt - b[1].resetAt,
    );
    for (const [key] of entries.slice(
      0,
      Math.max(1, rateLimitStore.size - RATE_LIMIT_MAX_ENTRIES),
    )) {
      rateLimitStore.delete(key);
    }
  }

  const identifier = await getClientIdentifier();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(identifier, existing);
  return false;
}

const COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Host-wedding_access'
    : 'wedding_access';

function createAccessCookieValue(accessSecret: string) {
  return createHmac('sha256', accessSecret)
    .update('wedding-access')
    .digest('base64url');
}

async function setAccessCookie() {
  const accessSecret = process.env.WEDDING_ACCESS_SECRET;
  if (!accessSecret) return false;

  const cookieValue = createAccessCookieValue(accessSecret);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });

  return true;
}

function tokensMatch(submitted: string, expected: string) {
  const submittedHash = createHash('sha256').update(submitted).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(submittedHash, expectedHash);
}

export async function isAccessUnlocked(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessSecret = process.env.WEDDING_ACCESS_SECRET;
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

  if (!cookieValue || !accessSecret) {
    return false;
  }

  const expectedValue = createAccessCookieValue(accessSecret);

  return (
    cookieValue.length === expectedValue.length &&
    timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expectedValue))
  );
}

export async function unlockAccessWithToken(
  token?: string | null,
): Promise<boolean> {
  if (!token) return false;

  const accessToken = process.env.WEDDING_ACCESS_TOKEN;
  const accessKey = process.env.WEDDING_ACCESS_PASSWORD;

  const expected = accessToken || accessKey;
  if (!expected) return false;

  const normalized = token.trim();
  if (!normalized) return false;

  if (!tokensMatch(normalized, expected)) return false;

  return setAccessCookie();
}

export async function unlockAccess(
  _prevState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  'use server';
  const t = await getTranslations('Errors');

  const isLimited = await isRateLimited();

  if (isLimited) {
    return {
      status: 'error',
      message: {
        title: t('rateLimit.title'),
        detail: t('rateLimit.detail'),
      },
    };
  }

  const accessKey = process.env.WEDDING_ACCESS_PASSWORD;
  const accessSecret = process.env.WEDDING_ACCESS_SECRET;
  const submittedKey = formData.get('accessKey');
  const normalizedKey =
    typeof submittedKey === 'string' ? submittedKey.trim() : '';

  if (!accessKey) {
    return {
      status: 'error',
      message: {
        title: t('missingPassword.title'),
        detail: t('missingPassword.detail'),
      },
    };
  }

  if (!accessSecret) {
    return {
      status: 'error',
      message: {
        title: t('missingSecret.title'),
        detail: t('missingSecret.detail'),
      },
    };
  }

  if (!normalizedKey) {
    return {
      status: 'error',
      message: {
        title: t('passwordRequired.title'),
        detail: t('passwordRequired.detail'),
      },
    };
  }

  const matches = tokensMatch(normalizedKey, accessKey);

  if (!matches) {
    return {
      status: 'error',
      message: {
        title: t('invalidPassword.title'),
        detail: t('invalidPassword.detail'),
      },
    };
  }

  await setAccessCookie();

  return { status: 'success' };
}
