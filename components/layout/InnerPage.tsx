import { InnerFooter } from '@/components/layout/SiteFooter';
import { TopBar } from '@/components/layout/TopBar';
import { SiteNav } from '@/components/navigation/SiteNav';

/** Shell shared by every non-home page: top bar, nav, main, three-column footer. */
export function InnerPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-inner">
      <TopBar variant="inner" />
      <SiteNav />
      <main id="main">{children}</main>
      <InnerFooter />
    </div>
  );
}
