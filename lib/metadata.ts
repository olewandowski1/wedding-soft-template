import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface MetadataProps {
  title: string;
  description: string;
}

export function createMetadata({
  title,
  description,
}: MetadataProps): Metadata {
  return {
    metadataBase: new URL(siteConfig.URL),
    title,
    description,
  };
}
