import { FadeIn } from '@/components/ui/FadeIn';
import { serviceAreaSection } from '@/data/home';

/** Local-trust block naming the Las Vegas Valley communities Butler's serves. */
export function ServiceArea() {
  return (
    <section className="service-area">
      <div className="container">
        <FadeIn className="service-area-inner">
          <div className="section-tag">{serviceAreaSection.tag}</div>
          <h2 className="section-title">{serviceAreaSection.heading}</h2>
          <p className="section-sub">{serviceAreaSection.intro}</p>
          <ul className="area-cities">
            {serviceAreaSection.cities.map((city) => (
              <li key={city}>
                <h3 className="area-city">{city}</h3>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
