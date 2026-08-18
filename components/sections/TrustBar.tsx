import { TrustIcons } from '@/components/ui/Icons';
import { trustItems } from '@/data/home';

export function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        {trustItems.map((item) => {
          const Icon = TrustIcons[item.icon];
          return (
            <div className="trust-item" key={item.label}>
              <div className="trust-icon">
                <Icon />
              </div>
              <div className="trust-label">
                {item.label}
                <span>{item.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
