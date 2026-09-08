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
    slug: 'ada-compliant-bathroom',
    title: 'What Makes a Bathroom ADA-Compliant?',
    date: 'September 8, 2026',
    datePublished: '2026-09-08T09:00:00-07:00',
    heroImage: '/images/gallery/gallery-05.jpg',
    heroBadge: 'Accessibility Remodeling',
    excerpt:
      'A bathroom is ADA-compliant when its clearances, fixture heights, and grab bars let someone with limited mobility approach, transfer, and use every fixture safely. Here is what that takes.',
    heroSubtitle: 'The clearances, heights, and grab bars that make a bathroom truly accessible.',
    body: [
      p(
        t('A bathroom is ADA-compliant when it meets a specific set of clearances, fixture heights, and grab bar requirements that let a person using a wheelchair or with limited mobility approach, transfer onto, and use every fixture safely and independently. Those numbers come from the 2010 ADA Standards for Accessible Design, and getting them right is the difference between a bathroom that looks accessible and one that actually works. It is the heart of any '),
        a('accessibility remodel', '/accessibility-remodels/'),
        t('.'),
      ),
      p(
        t('One thing to clear up first: the ADA is a civil-rights law for public and commercial spaces, so a private home is not legally required to meet it. But the ADA numbers are still the best blueprint for a home, because they are built around how a person actually moves, transfers, and reaches. When people ask for an ADA bathroom at home, what they really want is a '),
        a('bathroom remodel', '/bathroom-remodeling/'),
        t(' built to those proven standards.'),
      ),
      h('Doorway and Clear Floor Space'),
      p(t('Access starts at the door and the room around each fixture.')),
      ul(
        'The doorway needs a clear opening of at least 32 inches so a wheelchair can pass through.',
        'Each fixture needs a clear floor space of at least 30 by 48 inches so a person can pull up to it.',
        'The room needs turning space: either a 60-inch-diameter circle or a T-shaped turning area so a wheelchair can reverse direction.',
      ),
      h('The Toilet'),
      p(
        t('The toilet seat should sit 17 to 19 inches above the floor, higher than a standard toilet, so transferring on and off is easier. The centerline of the toilet is set 16 to 18 inches from the side wall, which leaves room for the grab bars and for a safe transfer.'),
      ),
      h('Grab Bars'),
      p(t('Grab bars are the single most important safety element, and they have real specifications, not just "put a bar somewhere."')),
      ul(
        'A grab bar on the wall behind the toilet must be at least 36 inches long.',
        'A grab bar on the side wall must be at least 42 inches long and start no more than 12 inches from the rear wall.',
        'Grab bars mount 33 to 36 inches above the floor.',
        'They must be anchored into blocking or studs to hold at least 250 pounds. A bar screwed into drywall alone is worse than no bar, because people trust it.',
      ),
      h('The Sink and Vanity'),
      p(t('The lavatory has to be usable from a seated position.')),
      ul(
        'The rim or counter sits no higher than 34 inches above the floor.',
        'There is open knee and toe clearance underneath so a wheelchair can roll up to the sink.',
        'Hot water and drain pipes are insulated or covered so legs are not burned.',
        'Faucets are lever-style or touchless, operable with one hand and without tight grasping or twisting.',
      ),
      h('The Shower or Tub'),
      p(
        t('This is where most accessible bathrooms are won or lost. A roll-in shower is at least 60 by 30 inches with a threshold no taller than half an inch, so a wheelchair can roll straight in. It needs grab bars, a folding seat, and a handheld sprayer on a slide bar. A smaller transfer shower (36 by 36 inches) works when the person can move from a chair to a built-in seat.'),
      ),
      p(
        t('For many homeowners the simplest path is to convert an old tub into a barrier-free shower with a '),
        a('tub-to-shower conversion', '/shower-tub-conversions/'),
        t(', or to install a '),
        a('walk-in bathtub', '/walk-in-bathtub-las-vegas/'),
        t(' with a low step-in door and a built-in seat for those who still want to bathe.'),
      ),
      h('Mirror, Controls, and Accessories'),
      p(t('The finishing details matter for someone seated.')),
      ul(
        'The bottom edge of the mirror sits no higher than 40 inches above the floor so it is usable from a wheelchair.',
        'Dispensers, switches, and controls fall within a comfortable reach range, roughly 15 to 48 inches off the floor.',
        'Flooring is slip-resistant, which protects everyone, not just wheelchair users.',
      ),
      h('Does ADA Apply to My Home Bathroom?'),
      p(
        t('Legally, no. The ADA covers businesses and public buildings, not private residences. Homes that need accessibility follow guidelines like ANSI A117.1 or universal-design principles instead. In practice, though, building a home bathroom to the ADA numbers is exactly how you make it safe and future-proof, whether it is for aging in place, a mobility change, or simply a smarter design. The specs are the same either way.'),
      ),
      h('Planning an Accessible Bathroom in Las Vegas'),
      p(
        t('Whether it is a commercial restroom that has to meet code or a home bathroom built for aging in place, the details are what make it work, and small misses (a grab bar in the wrong spot, a threshold half an inch too tall) defeat the whole purpose. Butler’s Construction handles '),
        a('accessibility remodels', '/accessibility-remodels/'),
        t(' and '),
        a('bathroom remodeling', '/bathroom-remodeling/'),
        t(' across the Las Vegas valley, from a single grab-bar-and-seat upgrade to a full barrier-free build. '),
        a('Contact us', '/contact-us/'),
        t(' for a walk-through and a plan built around the person who will use it.'),
      ),
    ],
    faqs: [
      {
        question: 'Does my home bathroom legally have to be ADA-compliant?',
        answer:
          'No. The ADA applies to public and commercial buildings, not private homes. A homeowner is not required to meet it. That said, building to the ADA numbers is the best way to make a home bathroom genuinely accessible and safe, which is why most accessibility remodels use those standards as the blueprint.',
      },
      {
        question: 'How high should grab bars be mounted?',
        answer:
          'Grab bars mount 33 to 36 inches above the floor. The bar behind the toilet should be at least 36 inches long, and the side-wall bar at least 42 inches long. Most importantly, they must be anchored into studs or blocking so they hold at least 250 pounds, not screwed into drywall alone.',
      },
      {
        question: 'How wide does an ADA bathroom door need to be?',
        answer:
          'The doorway needs a clear opening of at least 32 inches so a wheelchair can pass through. Keep in mind that is the clear width with the door open, so the door itself is usually a bit wider than 32 inches.',
      },
      {
        question: 'What is a roll-in shower?',
        answer:
          'A roll-in shower is a curbless shower at least 60 by 30 inches with a threshold no taller than half an inch, so a wheelchair can roll straight in with no step. It includes grab bars, a folding seat, and a handheld sprayer. It is the gold standard for an accessible bathroom.',
      },
      {
        question: 'What height should an ADA toilet be?',
        answer:
          'The top of the toilet seat should sit 17 to 19 inches above the floor, which is higher than a standard toilet and makes transferring on and off much easier. The toilet is also set 16 to 18 inches from the side wall to leave room for grab bars and a safe transfer.',
      },
      {
        question: 'Is a walk-in tub the same as an ADA bathroom?',
        answer:
          'Not by itself. A walk-in tub is one helpful fixture for someone who still wants to bathe, but an ADA-compliant bathroom is the whole room: the door width, floor clearances, grab bars, sink height, and shower or tub all working together. A walk-in tub or a tub-to-shower conversion is often one piece of that larger plan.',
      },
    ],
    seo: {
      title: "What Makes a Bathroom ADA-Compliant? | Butler's Construction",
      description:
        'What makes a bathroom ADA-compliant: door width, floor clearances, toilet and sink heights, grab bar specs, and roll-in showers, explained for Las Vegas remodels.',
      path: '/blog/ada-compliant-bathroom/',
      ogType: 'article',
    },
  },
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
