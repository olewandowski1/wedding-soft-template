import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  const names = siteConfig.NAME.split('&').map((s) => s.trim());
  const initial1 = names[0]?.[0] || 'Z';
  const initial2 = names[1]?.[0] || 'J';

  return (
    <div className={cn('flex items-center gap-1 font-serif text-2xl font-light italic text-primary', className)}>
      <span className="tracking-tighter">{initial1}</span>
      <span className="text-xl opacity-60">&</span>
      <span className="tracking-tighter">{initial2}</span>
    </div>
  );
}
