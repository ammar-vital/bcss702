import { ContactIcons } from '@/components/ui/Icons';
import { siteConfig } from '@/data/site';

type IconName = keyof typeof ContactIcons;

export interface ContactDetailItem {
  icon: IconName;
  label: string;
  value: React.ReactNode;
}

/** Emoji glyphs replaced the inline SVGs on the inner-page templates. */
const EMOJI: Partial<Record<IconName, string>> = {
  phone: '📞',
  mail: '✉️',
  pin: '📍',
  clock: '🕐',
  star: '⭐',
};

export function ContactDetails({
  items,
  emojiIcons = false,
}: {
  items: ContactDetailItem[];
  emojiIcons?: boolean;
}) {
  return (
    <div className="contact-items">
      {items.map((item) => {
        const Icon = ContactIcons[item.icon];
        const emoji = EMOJI[item.icon];
        return (
          <div className="contact-item" key={item.label}>
            <div className="contact-item-icon">
              {emojiIcons && emoji ? <span aria-hidden="true">{emoji}</span> : <Icon />}
            </div>
            <div className="contact-item-text">
              <span className="contact-item-label">{item.label}</span>
              <span className="contact-item-value">{item.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const officeAddress = (
  <a href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
    {siteConfig.address.lines[0]}
    <br />
    {siteConfig.address.lines[1]}
  </a>
);

const phoneLink = <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>;
const emailLink = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;

/** The five-item list rendered in the homepage contact section. */
export const homeContactItems: ContactDetailItem[] = [
  { icon: 'phone', label: 'Phone', value: phoneLink },
  {
    icon: 'globe',
    label: 'Website',
    value: (
      <a href={siteConfig.url} target="_blank" rel="noopener noreferrer">
        bcss702.com
      </a>
    ),
  },
  { icon: 'pin', label: 'Office', value: officeAddress },
  { icon: 'mail', label: 'Email', value: emailLink },
  { icon: 'clock', label: 'Hours', value: siteConfig.hours.summary },
];

/** The four-item list rendered on every service page. */
export const serviceContactItems: ContactDetailItem[] = [
  { icon: 'phone', label: 'Phone', value: phoneLink },
  { icon: 'mail', label: 'Email', value: emailLink },
  { icon: 'pin', label: 'Office', value: officeAddress },
  { icon: 'clock', label: 'Hours', value: siteConfig.hours.summary },
];

/** The five-item list rendered on /contact-us/. */
export const contactPageItems: ContactDetailItem[] = [
  { icon: 'phone', label: 'Phone', value: phoneLink },
  { icon: 'mail', label: 'Email', value: emailLink },
  { icon: 'pin', label: 'Office', value: officeAddress },
  {
    icon: 'clock',
    label: 'Hours',
    value: (
      <>
        {siteConfig.hours.lines.map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </>
    ),
  },
  {
    icon: 'star',
    label: 'Reviews',
    value: (
      <a href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
        Google Business Profile →
      </a>
    ),
  },
];
