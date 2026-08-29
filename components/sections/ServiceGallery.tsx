import Image from 'next/image';
import Link from 'next/link';

import { homeGallery } from '@/data/home';

export function ServiceGallery() {
  const images = homeGallery.slice(0, 6);
  return (
    <section className="svc-gallery">
      <div className="container">
        <div className="section-tag">Our Work</div>
        <h2 className="section-title">Recent Projects Around Las Vegas</h2>
        <div className="svc-gallery-grid">
          {images.map((image) => (
            <div className="svc-gallery-item" key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 50vw, 320px"
              />
            </div>
          ))}
        </div>
        <div className="svc-gallery-cta">
          <Link href="/gallery/" className="svc-gallery-link">
            View the full gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
