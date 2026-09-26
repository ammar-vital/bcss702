// Primary topics per blog post, linked to Wikidata (QIDs verified against the
// Wikidata API) so search and AI engines can tie each post to known entities.
export interface Topic {
  name: string;
  wikidata: string;
  wikipedia: string;
}

const t = (name: string, wikidata: string, wikipedia: string): Topic => ({ name, wikidata, wikipedia });

const LAS_VEGAS = t('Las Vegas', 'Q23768', 'Las_Vegas');
const RENOVATION = t('Renovation', 'Q2144402', 'Renovation');
const ACCESSIBILITY = t('Accessibility', 'Q555097', 'Accessibility');
const GENERAL_CONTRACTOR = t('General contractor', 'Q289612', 'General_contractor');

export const blogTopics: Record<string, Topic[]> = {
  'tank-vs-tankless-water-heater-las-vegas': [
    t('Tankless water heater', 'Q5953359', 'Tankless_water_heating'),
    t('Water heating', 'Q27098513', 'Water_heating'),
    LAS_VEGAS,
  ],
  'walk-in-tub-vs-roll-in-shower': [t('Aging in place', 'Q4692582', 'Aging_in_place'), ACCESSIBILITY],
  'design-build-vs-hiring-a-contractor': [t('Design-build', 'Q4921794', 'Design%E2%80%93build'), GENERAL_CONTRACTOR],
  'ada-compliant-bathroom': [
    t('Americans with Disabilities Act of 1990', 'Q1111004', 'Americans_with_Disabilities_Act_of_1990'),
    t('Bathroom', 'Q190771', 'Bathroom'),
    ACCESSIBILITY,
  ],
  'kitchen-remodel-cost-las-vegas': [t('Kitchen', 'Q43164', 'Kitchen'), RENOVATION, LAS_VEGAS],
  'outdoor-living-space-las-vegas': [t('Home improvement', 'Q2789106', 'Home_improvement'), LAS_VEGAS],
  'how-to-choose-a-general-contractor-las-vegas': [GENERAL_CONTRACTOR, LAS_VEGAS],
  'bathroom-remodeling-las-vegas': [t('Bathroom', 'Q190771', 'Bathroom'), RENOVATION, LAS_VEGAS],
};

export function topicSchema(topic: Topic) {
  return {
    '@type': 'Thing',
    name: topic.name,
    sameAs: [`https://www.wikidata.org/wiki/${topic.wikidata}`, `https://en.wikipedia.org/wiki/${topic.wikipedia}`],
  };
}
