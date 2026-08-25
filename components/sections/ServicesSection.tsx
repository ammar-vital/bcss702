import Image from 'next/image';
import Link from 'next/link';

import { ServiceIcons } from '@/components/ui/Icons';
import { featuredServices } from '@/data/home';

export function ServicesSection() {
  return (
    <section id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">
              Complete Property
              <br />
              Solutions Under One Roof
            </h2>
          </div>
          <Link href="/services/" className="btn-primary">
            All Services →
          </Link>
        </div>

        <div className="services-grid">
          {featuredServices.map((service) => {
            const Icon = ServiceIcons[service.icon];
            return (
              <Link className="service-card" href={service.href} key={service.href}>
                <Image
                  className="service-img"
                  src={service.image}
                  alt={service.imageAlt}
                  width={420}
                  height={220}
                />
                <div className="service-body">
                  <div className="service-icon">
                    <Icon />
                  </div>
                  <div className="service-name">{service.name}</div>
                  <div className="service-desc">{service.description}</div>
                  <div className="service-link">Learn More</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
