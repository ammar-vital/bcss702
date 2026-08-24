import { siteConfig } from '@/data/site';

type Variant = 'home' | 'inner' | 'services';

/** The maroon strip above the nav. Each template shipped its own wording. */
export function TopBar({ variant }: { variant: Variant }) {
  const phone = (
    <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
  );

  if (variant === 'home') {
    return (
      <div className="top-bar">
        Call Us Today: {phone} &nbsp;|&nbsp; Serving All of Las Vegas, NV &nbsp;|&nbsp; Licensed &amp;
        Insured General Contractor
      </div>
    );
  }

  if (variant === 'services') {
    return (
      <div className="top-bar">
        Call Us Today: {phone} &nbsp;|&nbsp; 3255 Pepper Lane, Suite 109A, Las Vegas NV
      </div>
    );
  }

  return (
    <div className="top-bar">
      Call Us Today: {phone} &nbsp;|&nbsp; NV Licensed General Contractor &nbsp;|&nbsp; 3255 Pepper
      Lane, Suite 109A, Las Vegas
    </div>
  );
}
