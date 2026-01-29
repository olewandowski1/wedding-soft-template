import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export const alt = `${siteConfig.NAME} — ${siteConfig.SHORT_DESCRIPTION}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

function WeddingLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        zIndex: 2,
      }}
    >
      <svg
        width='64'
        height='64'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='50'
          cy='62'
          r='28'
          stroke='#7A4544'
          strokeWidth='4'
          fill='none'
          opacity='0.4'
        />
        <path d='M50 15 L68 32 L50 50 L32 32 Z' fill='#7A4544' opacity='0.6' />
      </svg>
    </div>
  );
}

export default async function OpenGraphImage() {
  const t = await getTranslations('Metadata');
  let fontData: Buffer | ArrayBuffer;

  try {
    fontData = await readFile(
      join(process.cwd(), 'assets/PlayfairDisplay-Regular.ttf'),
    );
  } catch {
    fontData = new ArrayBuffer(0);
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        position: 'relative',
        backgroundColor: '#FAF9F6',
        color: '#453232',
      }}
    >
      {/* Subtle Background Texture/Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(circle at center, #ffffff 0%, #FAF9F6 100%)',
        }}
      />

      {/* Elegant Double Border */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: '0.5px solid rgba(122, 69, 68, 0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 45,
          left: 45,
          right: 45,
          bottom: 45,
          border: '1px solid rgba(122, 69, 68, 0.1)',
        }}
      />

      {/* Delicate Corner Ornaments */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          width: 40,
          height: 40,
          borderTop: '1px solid #7A4544',
          borderLeft: '1px solid #7A4544',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          width: 40,
          height: 40,
          borderTop: '1px solid #7A4544',
          borderRight: '1px solid #7A4544',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          width: 40,
          height: 40,
          borderBottom: '1px solid #7A4544',
          borderLeft: '1px solid #7A4544',
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          width: 40,
          height: 40,
          borderBottom: '1px solid #7A4544',
          borderRight: '1px solid #7A4544',
          opacity: 0.3,
        }}
      />

      <WeddingLogo />

      <div
        style={{
          fontSize: 18,
          letterSpacing: '0.6em',
          textTransform: 'uppercase',
          marginBottom: 32,
          color: 'rgba(122, 69, 68, 0.5)',
          fontFamily: 'Playfair Display',
          zIndex: 2,
        }}
      >
        {t('invitation')}
      </div>

      <div
        style={{
          fontSize: 110,
          fontFamily: 'Playfair Display',
          marginBottom: 20,
          textAlign: 'center',
          lineHeight: 0.9,
          zIndex: 2,
          color: '#7A4544',
          display: 'flex',
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        {siteConfig.NAME}
      </div>

      <div
        style={{
          width: 40,
          height: 1,
          background: 'rgba(122, 69, 68, 0.2)',
          marginBottom: 40,
          zIndex: 2,
        }}
      />

      <div
        style={{
          fontSize: 22,
          maxWidth: 700,
          textAlign: 'center',
          lineHeight: 1.6,
          zIndex: 2,
          fontFamily: 'Playfair Display',
          fontStyle: 'italic',
          color: 'rgba(69, 50, 50, 0.6)',
          letterSpacing: '0.02em',
        }}
      >
        {t('description')}
      </div>

      {/* Flourish Accent */}
      <div
        style={{
          marginTop: 40,
          fontSize: 12,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(122, 69, 68, 0.3)',
          fontFamily: 'Playfair Display',
          zIndex: 2,
        }}
      >
        Est. 2026
      </div>
    </div>,
    {
      ...size,
      fonts:
        fontData.byteLength > 0
          ? [
              {
                name: 'Playfair Display',
                data: fontData,
                style: 'normal',
                weight: 400,
              },
            ]
          : [],
    },
  );
}
