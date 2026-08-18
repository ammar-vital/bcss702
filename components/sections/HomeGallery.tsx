import Image from 'next/image';

import { homeGallery } from '@/data/home';

export function HomeGallery() {
  return (
    <section id="gallery">
      <div className="container">
        <div className="section-tag">Our Work</div>
        <h2 className="section-title">
          Built by Hand.
          <br />
          Built to Last.
        </h2>
        <div className="gallery-grid">
          {homeGallery.map((image) => (
            <div className="gallery-item" key={image.src}>
              {/* Intrinsic sizing, not `fill`: the desktop grid crops each tile
                  to a 220px row, while the mobile grid lets the tile keep the
                  photo's own aspect ratio — exactly as the theme did. */}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 320px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
