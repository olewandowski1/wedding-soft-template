import { AccessGate } from '@/components/access-gate';
import { Details } from '@/components/details';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';
import { Gallery } from '@/components/gallery';
import { Hero } from '@/components/hero';
import { InfoSection } from '@/components/info-section';
import { Navigation } from '@/components/navigation';
import { RSVP } from '@/components/rsvp';
import { Story } from '@/components/story';
import { Timeline } from '@/components/timeline';
import {
  isAccessUnlocked,
  unlockAccess,
  unlockAccessWithToken,
} from '@/lib/access';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const accessKey =
    typeof params?.accessKey === 'string' ? params?.accessKey : undefined;
  const token = typeof params?.token === 'string' ? params?.token : undefined;

  const tokenUnlocked = await unlockAccessWithToken(accessKey ?? token);
  const isUnlocked = tokenUnlocked || (await isAccessUnlocked());

  if (!isUnlocked) {
    return (
      <div className='flex min-h-screen flex-col'>
        <main className='grow'>
          <Hero cta={<AccessGate unlockAction={unlockAccess} />} />
        </main>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Navigation />
      <main className='grow'>
        <Hero />
        <Story />
        <Details />
        <Timeline />
        <InfoSection />
        <FAQ />
        <Gallery />
        <RSVP />
      </main>
      <Footer />
    </div>
  );
}
