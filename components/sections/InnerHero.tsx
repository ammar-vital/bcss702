import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

interface Props {
  /** Background photo; omit for the plain dark hero used by the privacy page. */
  image?: string;
  badge?: string;
  heading: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  /**
   * Matches the `style="min-height:…vh"` the theme set on some heroes. It stays
   * an inline style on purpose: the mobile media query collapses `.hero` to
   * `min-height: 0`, and the original's inline value deliberately outranked it.
   */
  minHeight?: string;
  /** `blog` tightens the heading and subtitle to a single line each. */
  variant?: 'blog';
  children?: React.ReactNode;
}

export function InnerHero({
  image,
  badge,
  heading,
  subtitle,
  breadcrumbs,
  minHeight,
  variant,
  children,
}: Props) {
  return (
    <section className={`hero${variant ? ` hero-${variant}` : ''}`} style={minHeight ? { minHeight } : undefined}>
      {image ? (
        <>
          <div className="hero-bg" style={{ backgroundImage: `url('${image}')` }} />
          <div className="hero-overlay" />
        </>
      ) : (
        <div className="hero-overlay-solid" />
      )}
      <div className="hero-content">
        <Breadcrumbs items={breadcrumbs} />
        {badge && <div className="hero-badge">{badge}</div>}
        <h1>{heading}</h1>
        {subtitle && <p className="sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
