import type { ContentBlock, InlineNode } from '@/types/content';
import type { PageSeo } from '@/types/seo';

// Compact authoring helpers so the posts below stay readable.
const h = (text: string): ContentBlock => ({ type: 'heading', text });
const t = (text: string): InlineNode => ({ type: 'text', text });
const a = (text: string, href: string): InlineNode => ({ type: 'link', text, href });
const p = (...content: InlineNode[]): ContentBlock => ({ type: 'paragraph', content });
const ul = (...items: string[]): ContentBlock => ({ type: 'list', items: items.map((s) => [t(s)]) });

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // display date
  datePublished: string; // ISO
  heroImage: string;
  heroBadge: string;
  excerpt: string;
  heroSubtitle: string;
  body: ContentBlock[];
  faqs: { question: string; answer: string }[];
  seo: PageSeo;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'kitchen-remodel-cost-las-vegas',
    title: 'How Much Does a Kitchen Remodel Cost in Las Vegas?',
    date: 'August 26, 2026',
    datePublished: '2026-08-26T09:00:00-07:00',
    heroImage: '/images/gallery/gallery-02.jpg',
    heroBadge: 'Kitchen Remodeling',
    excerpt:
      'Real 2026 cost ranges for a Las Vegas kitchen remodel, what drives the price, where the budget goes, and how to get the most for your money.',
    heroSubtitle: 'Real 2026 cost ranges and what drives the price.',
    body: [
      p(
        t('A kitchen remodel is one of the most rewarding home projects you can take on, and also one of the most misunderstood when it comes to cost. In Las Vegas, a '),
        a('kitchen remodel', '/kitchen-remodeling/'),
        t(' can range from a modest refresh to a full transformation, and the final number depends on the size of the room, the quality of the materials, and how much of the layout you change.'),
      ),
      h('Typical Kitchen Remodel Cost Ranges'),
      p(
        t('There is no single price, but most Las Vegas kitchen projects fall into three broad tiers. A cosmetic refresh, meaning new paint, hardware, a countertop, and a backsplash while keeping the existing layout, commonly runs from 15,000 to 30,000 dollars. A mid-range remodel with new cabinets, counters, flooring, and appliances usually lands between 30,000 and 60,000 dollars. A major remodel that moves walls, relocates plumbing, or opens the kitchen to another room can run 60,000 dollars and up.'),
      ),
      p(
        t('These are broad ranges, not quotes. The only way to know your number is a walk-through and a detailed bid, because two kitchens of the same size can differ by tens of thousands of dollars based on the choices inside them.'),
      ),
      h('What Drives the Price'),
      p(t('A handful of decisions account for most of the difference between a modest budget and a large one:')),
      ul(
        'Cabinets, which are often the single biggest line item, from stock to semi-custom to fully custom.',
        'Countertops, where the material and edge detail can swing the price widely.',
        'Layout changes, since moving plumbing, gas, or load-bearing walls adds labor and permits.',
        'Appliances, which range from builder-grade to professional series.',
        'Finishes like tile, lighting, and hardware that add up quickly across a whole room.',
      ),
      h('Where the Money Goes'),
      p(
        t('In a typical mid-range project, cabinets and '),
        a('countertops', '/countertop-installation/'),
        t(' together often make up close to half the budget, with labor, '),
        a('flooring', '/kitchen-flooring/'),
        t(', appliances, and finishes making up the rest. Understanding this split helps you spend where it matters. Many homeowners put their money into the cabinets and counters they touch every day and save on items that are easy to change later.'),
      ),
      h('How to Get the Most for Your Budget'),
      p(
        t('Keeping the existing footprint is the biggest single way to control cost, because moving plumbing and walls is where budgets balloon. Choosing durable, mid-grade materials over the most expensive option, and making your selections before work begins so there are no change orders mid-project, also keeps the number predictable. A good contractor will help you find the line between what lasts and what simply looks expensive.'),
      ),
      h('When to Bring in a Contractor'),
      p(
        t('If your project involves new cabinets, electrical or plumbing work, or any change to the layout, it is worth working with a licensed general contractor who can pull the right permits, coordinate the trades, and stand behind the work. Butler’s Construction is a licensed and insured Las Vegas general contractor, and we are happy to walk your kitchen and give you an honest, detailed estimate.'),
      ),
    ],
    faqs: [
      { question: 'How much does a kitchen remodel cost in Las Vegas?', answer: 'Most Las Vegas kitchen remodels fall between 15,000 dollars for a cosmetic refresh and 60,000 dollars or more for a major remodel, with mid-range projects commonly landing between 30,000 and 60,000 dollars. The final cost depends on the size of the kitchen, the materials you choose, and whether you change the layout.' },
      { question: 'What is the most expensive part of a kitchen remodel?', answer: 'Cabinets are usually the single largest cost, followed by countertops. Together they often make up close to half of a mid-range budget, which is why cabinet choice has such a big effect on the total.' },
      { question: 'How long does a kitchen remodel take?', answer: 'A cosmetic refresh can take a couple of weeks, while a full remodel with new cabinets and layout changes commonly runs six to ten weeks. Timelines depend on the scope, material lead times, and inspections.' },
      { question: 'Do I need a permit to remodel a kitchen in Las Vegas?', answer: 'Cosmetic work like paint and cabinet swaps generally does not require a permit, but electrical, plumbing, gas, and structural changes usually do. A licensed contractor will confirm what your specific project needs and pull the permits for you.' },
      { question: 'Does a kitchen remodel add value to my home?', answer: 'A well-planned kitchen remodel is consistently one of the better returns on investment in home improvement, and it also makes the home more enjoyable to live in. The value returned depends on the quality of the work and how the finishes fit the home and neighborhood.' },
    ],
    seo: {
      title: "Kitchen Remodel Cost Las Vegas (2026) | Butler's Construction",
      description: 'How much a kitchen remodel costs in Las Vegas in 2026: real price ranges, what drives the cost, where the budget goes, and how to save.',
      path: '/blog/kitchen-remodel-cost-las-vegas/',
      datePublished: '2026-08-26T09:00:00-07:00',
      ogType: 'article',
    },
  },

  {
    slug: 'outdoor-living-space-las-vegas',
    title: 'Beat the Heat: Designing an Outdoor Living Space in Las Vegas',
    date: 'July 23, 2026',
    datePublished: '2026-07-23T09:00:00-07:00',
    heroImage: '/images/gallery/gallery-07.jpg',
    heroBadge: 'Outdoor Living',
    excerpt:
      'How to design a backyard that works in the desert heat, from shade and covered patios to outdoor kitchens and materials built for Las Vegas summers.',
    heroSubtitle: 'Design a backyard built for the desert heat.',
    body: [
      p(
        t('In Las Vegas, the backyard can be the best room in the house for much of the year, as long as it is built for the climate. A thoughtful '),
        a('outdoor living space', '/outdoor-living-spaces/'),
        t(' turns brutal afternoons into comfortable evenings and gives you room to cook, gather, and relax without ever leaving home.'),
      ),
      h('Start With Shade'),
      p(
        t('The single most important decision in a desert backyard is shade. A covered patio, pergola, or louvered roof drops the temperature underneath by a noticeable margin and makes the space usable long before the sun goes down. Orienting seating away from the harsh western sun and adding fans or misters extends your comfortable hours even further into a July afternoon.'),
      ),
      h('Design for Evenings'),
      p(
        t('Because summer days are hot, the best Las Vegas backyards are built for evening use. Good lighting, a fire feature for the cooler months, and comfortable seating turn the space into somewhere you actually want to be after dark. Plan the layout around how you will really use it, whether that is quiet dinners for two or weekend gatherings for a crowd.'),
      ),
      h('Outdoor Kitchens and Entertaining'),
      p(
        t('An outdoor kitchen keeps the heat and the mess out of the house during the summer. Even a simple built-in grill with counter space and a shaded prep area makes a real difference, and a full setup with a sink, refrigerator, and bar seating becomes the center of the yard. Durable '),
        a('tile and stonework', '/custom-tile-stonework/'),
        t(' on counters and floors stands up to sun and spills better than most indoor materials.'),
      ),
      h('Materials That Survive the Desert'),
      p(t('Not every material belongs in a Las Vegas backyard. The sun, heat, and occasional monsoon storms are hard on finishes, so it pays to choose surfaces that were made for it:')),
      ul(
        'Porcelain and natural stone pavers that resist heat and fading better than many alternatives.',
        'Powder-coated metal and treated wood or composite for structures that will not warp or splinter.',
        'Light-colored surfaces that stay cooler underfoot than dark ones.',
        'Drought-tolerant landscaping that looks good with far less water.',
      ),
      h('Do You Need a Permit?'),
      p(
        t('Many outdoor projects in the Las Vegas valley require permits, especially covered structures, electrical, gas lines, and anything attached to the house or near property lines. The rules vary between the City of Las Vegas, Henderson, North Las Vegas, and unincorporated Clark County, so it is worth confirming before you build. A licensed '),
        a('general contractor', '/general-contracting/'),
        t(' will know the local requirements and handle the permitting so the project is done right and inspected.'),
      ),
    ],
    faqs: [
      { question: 'What are the best outdoor features for the Las Vegas heat?', answer: 'Shade is the priority, whether from a covered patio, pergola, or louvered roof, followed by fans or misters and evening-friendly lighting. An outdoor kitchen and a fire feature extend the seasons, and heat-tolerant materials keep everything comfortable and low maintenance.' },
      { question: 'How much does a covered patio cost in Las Vegas?', answer: 'Costs vary widely with size, materials, and whether the structure is attached to the house, but covered patios and shade structures are commonly a few thousand dollars for a simple version up to tens of thousands for a large custom build with electrical and finishes. A walk-through and detailed bid is the only way to get an accurate number.' },
      { question: 'What materials hold up best in a desert backyard?', answer: 'Porcelain and natural stone pavers, powder-coated metal, composite decking, and light-colored surfaces all handle the sun and heat well. Drought-tolerant landscaping rounds it out by cutting water use while still looking finished.' },
      { question: 'Do I need a permit for a backyard project in Las Vegas?', answer: 'Often yes. Covered structures, electrical, gas, and anything attached to the house or near a property line usually require a permit, and the rules differ by city and by Clark County. A licensed contractor will confirm what is required and handle it.' },
      { question: 'When is the best time to build an outdoor living space?', answer: 'Building in the cooler months means the space is ready to enjoy before summer arrives, and contractor schedules are often more open. That said, projects can be built year round, and planning ahead is the most important step.' },
    ],
    seo: {
      title: "Outdoor Living Spaces Las Vegas | Butler's Construction",
      description: 'Design a Las Vegas backyard built for the heat: shade, covered patios, outdoor kitchens, and materials that survive the desert sun.',
      path: '/blog/outdoor-living-space-las-vegas/',
      datePublished: '2026-07-23T09:00:00-07:00',
      ogType: 'article',
    },
  },

  {
    slug: 'how-to-choose-a-general-contractor-las-vegas',
    title: 'How to Choose a Licensed General Contractor in Las Vegas',
    date: 'June 12, 2026',
    datePublished: '2026-06-12T09:00:00-07:00',
    heroImage: '/images/gallery/gallery-11.jpg',
    heroBadge: 'Homeowner Guide',
    excerpt:
      'A step-by-step guide to hiring the right contractor in Las Vegas: how to verify a license, check insurance, compare bids, and spot the red flags.',
    heroSubtitle: 'How to verify, compare, and hire with confidence.',
    body: [
      p(
        t('Choosing the right contractor is the most important decision in any construction or remodeling project. A good one protects your home, your budget, and your peace of mind, while the wrong one can cost you all three. Here is how to hire a '),
        a('licensed general contractor', '/general-contracting/'),
        t(' in Las Vegas with confidence.'),
      ),
      h('Verify the License First'),
      p(
        t('In Nevada, general contractors must be licensed through the Nevada State Contractors Board. Before you sign anything, look up the contractor’s license number on the board’s website to confirm it is active, in good standing, and covers the type of work you need. A legitimate contractor will give you their license number without hesitation. Butler’s Construction holds Nevada license number 74507.'),
      ),
      h('Confirm Insurance and Bonding'),
      p(
        t('Ask for proof of liability insurance and workers compensation, and confirm the contractor carries the bond required for licensing. This matters because if someone is hurt or something is damaged on an uninsured job, the liability can land on you as the homeowner. A minute spent confirming coverage can save you from a very expensive problem.'),
      ),
      h('Check Reviews and Real References'),
      p(t('Look beyond a star rating. Read how a contractor responds to problems, ask for references from recent projects similar to yours, and if you can, look at completed work in person. A strong track record with real homeowners is one of the best signals you will find.')),
      h('Get Detailed, Comparable Bids'),
      p(
        t('Get at least two or three written bids, and make sure they are detailed enough to compare. A real bid spells out the scope, the materials, the timeline, and the payment schedule, not just a single number. Be cautious of a bid that is dramatically lower than the others, because it often means something was left out or the quality will not be there. The goal is the best value, not simply the lowest price.'),
      ),
      h('Watch for Red Flags'),
      p(t('A few warning signs come up again and again with problem contractors:')),
      ul(
        'Pressure to pay a large amount up front or to pay entirely in cash.',
        'No written contract, or a contract with a vague scope of work.',
        'A license number they will not provide or that does not check out.',
        'No proof of insurance, or reluctance to show it.',
        'Prices that seem too good to be true, which usually means they are.',
      ),
      h('Get Everything in Writing'),
      p(
        t('A solid contract protects both sides. It should include the full scope of work, the materials and finishes, the total price and payment schedule, the start and completion timeline, and how changes will be handled. Whether you are planning a '),
        a('home remodel', '/home-remodeling/'),
        t(' or a ground-up build, a clear written agreement is the foundation of a project that goes smoothly.'),
      ),
    ],
    faqs: [
      { question: 'How do I check if a contractor is licensed in Nevada?', answer: 'Look up the contractor on the Nevada State Contractors Board website using their name or license number. It will show whether the license is active, what classifications it covers, and whether there are any disciplinary actions. A reputable contractor will give you their license number freely.' },
      { question: 'What is the difference between a licensed contractor and a handyman?', answer: 'A licensed general contractor is bonded, insured, and authorized to pull permits and manage larger projects and multiple trades, and is held to state standards. A handyman is suited to small repairs and odd jobs, and in Nevada there are limits on the dollar value of work that can be done without a license.' },
      { question: 'How many bids should I get for a project?', answer: 'Getting at least two or three detailed written bids is a good rule. Comparing them helps you understand the fair price and the scope, and it makes an unusually low or vague bid easier to spot.' },
      { question: 'What are the biggest red flags when hiring a contractor?', answer: 'Watch for demands for large cash payments up front, no written contract, a license number they will not share or that does not check out, no proof of insurance, and a price that seems too good to be true. Any one of these is a reason to pause.' },
      { question: 'What should a construction contract include?', answer: 'A good contract spells out the full scope of work, the materials and finishes, the total price and payment schedule, the start and completion dates, and how change orders are handled. Getting all of this in writing protects both you and the contractor.' },
    ],
    seo: {
      title: "How to Choose a Contractor in Las Vegas | Butler's Construction",
      description: 'How to hire a licensed general contractor in Las Vegas: verify the license, confirm insurance, compare bids, and spot the red flags.',
      path: '/blog/how-to-choose-a-general-contractor-las-vegas/',
      datePublished: '2026-06-12T09:00:00-07:00',
      ogType: 'article',
    },
  },

  {
    slug: 'bathroom-remodeling-las-vegas',
    title: 'Bathroom Remodeling in Las Vegas: Costs, Ideas, and Permits',
    date: 'May 25, 2026',
    datePublished: '2026-05-25T09:00:00-07:00',
    heroImage: '/images/gallery/gallery-05.jpg',
    heroBadge: 'Bathroom Remodeling',
    excerpt:
      'What a Las Vegas bathroom remodel really costs, the upgrades homeowners love most, how to plan for hard water and aging in place, and the permit basics.',
    heroSubtitle: 'Costs, popular upgrades, and the permit basics.',
    body: [
      p(
        t('A bathroom remodel delivers some of the best return on a home improvement dollar, and it is one of the upgrades homeowners enjoy every single day. A '),
        a('bathroom remodel', '/bathroom-remodeling/'),
        t(' in Las Vegas can be anything from a quick refresh to a complete rebuild, and the cost follows the scope.'),
      ),
      h('Typical Bathroom Remodel Costs'),
      p(
        t('Most Las Vegas bathroom remodels fall into a few tiers. A hall or guest bathroom refresh with a new vanity, toilet, fixtures, and paint commonly runs from 8,000 to 20,000 dollars. A full remodel of a primary bathroom with a new shower, tile, vanity, and lighting usually lands between 20,000 and 45,000 dollars. A large primary suite with a custom walk-in shower, freestanding tub, and premium finishes can run higher. As always, these are ranges rather than quotes, and the real number comes from a detailed bid.'),
      ),
      h('Upgrades Homeowners Love Most'),
      p(t('A handful of features show up on almost every wish list, and for good reason:')),
      ul(
        'A large, curbless walk-in shower in place of a tub-shower combo.',
        'A double vanity with plenty of storage and good lighting.',
        'Heated floors and modern, water-efficient fixtures.',
        'Custom tile work that sets the tone for the whole room.',
      ),
      h('Design for Hard Water and Heat'),
      p(
        t('Las Vegas has notably hard water, which leaves spots and mineral buildup on fixtures and glass over time. Choosing quality fixtures, treated glass, and easy-to-clean '),
        a('tile and stonework', '/custom-tile-stonework/'),
        t(' makes a real difference in how the bathroom looks and how much maintenance it takes years down the road.'),
      ),
      h('Plan for Aging in Place'),
      p(
        t('More homeowners are building bathrooms that will still work for them decades from now. A curbless shower, grab bars that double as towel bars, comfort-height fixtures, and a bench make a bathroom safer and more comfortable without looking clinical. Our '),
        a('accessibility remodels', '/accessibility-remodels/'),
        t(' bring these ideas together for homeowners who want to stay in the home they love.'),
      ),
      h('Permits and Timeline'),
      p(
        t('Cosmetic updates usually do not require a permit, but moving plumbing, changing the layout, or doing electrical work generally does. In the Las Vegas valley the specific requirements depend on your city or on Clark County, and a licensed contractor will confirm and pull what is needed. A typical bathroom remodel runs from a couple of weeks for a refresh to four to eight weeks for a full rebuild, depending on scope and material lead times.'),
      ),
    ],
    faqs: [
      { question: 'How much does a bathroom remodel cost in Las Vegas?', answer: 'A guest bathroom refresh commonly runs 8,000 to 20,000 dollars, while a full primary bathroom remodel usually lands between 20,000 and 45,000 dollars, and a large custom suite can run higher. The cost depends on the size of the room, the materials, and how much of the plumbing and layout changes.' },
      { question: 'Do I need a permit to remodel a bathroom in Las Vegas?', answer: 'Cosmetic updates like a new vanity or paint generally do not require a permit, but moving plumbing, changing the layout, or electrical work usually does. Requirements vary by city and by Clark County, and a licensed contractor will confirm and handle the permits.' },
      { question: 'How long does a bathroom remodel take?', answer: 'A simple refresh can be done in a couple of weeks, while a full remodel with a new shower, tile, and layout changes commonly takes four to eight weeks. Material lead times and inspections affect the schedule.' },
      { question: 'Should I choose a walk-in shower or keep a tub?', answer: 'It depends on how you use the space and your plans for the home. Many homeowners love a large curbless walk-in shower for its look and accessibility, though keeping at least one tub in the home can matter for resale. A good remodeler will help you weigh both.' },
      { question: 'Does a bathroom remodel add value to my home?', answer: 'Bathroom remodels are consistently among the stronger returns in home improvement, and they make daily life better in the meantime. The value returned depends on the quality of the work and how the finishes suit the home.' },
    ],
    seo: {
      title: "Bathroom Remodeling Las Vegas | Butler's Construction",
      description: 'What a Las Vegas bathroom remodel costs, the most popular upgrades, planning for hard water and aging in place, and permit basics.',
      path: '/blog/bathroom-remodeling-las-vegas/',
      datePublished: '2026-05-25T09:00:00-07:00',
      ogType: 'article',
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
