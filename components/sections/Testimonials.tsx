import { FadeIn } from '@/components/ui/FadeIn';
import { reviews } from '@/data/home';

export function Testimonials() {
  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <div className="testimonials-head">
          <div className="section-tag">What People Say</div>
          <h2 className="section-title">People Say the Nicest Things</h2>
          <p className="section-sub">
            Don&rsquo;t take our word for it. Here&rsquo;s what real Las Vegas homeowners and
            businesses say about working with Butler&rsquo;s.
          </p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <FadeIn className="review-card" as="figure" key={review.author}>
              <div className="stars" aria-label="Rated 5 out of 5">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote className="review-text">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="review-author">
                <div className="review-avatar" aria-hidden="true">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="review-name">{review.author}</div>
                  <div className="review-platform">{review.platform}</div>
                </div>
              </figcaption>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
