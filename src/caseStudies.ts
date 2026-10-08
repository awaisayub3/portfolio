export type Case = {
  tagline: string
  lede: string
  role: string
  client: string
  focus: string
  stats: { value: string; label: string }[]
  overview: string[]
  problemTitle: string
  problem: string
  gaps: { title: string; text: string }[]
  approachTitle: string
  approach: string
  steps: { title: string; text: string }[]
  quote: string
  outcomeTitle: string
  outcome: string
  results: { value: string; label: string }[]
}

const make = (
  tagline: string,
  role: string,
  client: string,
  focus: string,
  stats: [string, string][],
  subject: string,
  audience: string,
  quote: string,
  results: [string, string][],
): Case => ({
  tagline,
  lede: `${tagline}. A mock case study showing how I take ${subject} from a fuzzy brief to a shipped, measurable product.`,
  role,
  client,
  focus,
  stats: stats.map(([value, label]) => ({ value, label })),
  overview: [
    `${client} came with a real problem and too many opinions. ${audience} were juggling disconnected tools, and nothing made the next step obvious.`,
    `I joined as ${role.toLowerCase()}, wrote down who we were designing for, ranked what mattered, and measured every screen against that list before a single pixel shipped.`,
  ],
  problemTitle: 'The experience asked people to do the work the product should do.',
  problem: `Research with ${audience.toLowerCase()} kept returning to one theme: they did not distrust the product, they just could not tell what it wanted from them.`,
  gaps: [
    { title: 'The clarity gap.', text: 'Key actions were buried under secondary options, so first-time users hesitated at the exact moment they should commit.' },
    { title: 'The consistency gap.', text: 'Patterns changed from screen to screen, which made every new flow feel like learning the product again.' },
  ],
  approachTitle: 'Decide the order of importance first. Draw second.',
  approach: 'Before exploring layouts I wrote a one-page priority list and used it as the audit for every concept. Weak ideas failed on paper, which saved weeks of polish on the wrong direction.',
  steps: [
    { title: 'Discover', text: 'Interviews, analytics review, and a teardown of three competitors.' },
    { title: 'Define', text: 'A ranked priority list and a shared vocabulary for the whole team.' },
    { title: 'Design', text: 'Low-fi flows, then a component-first high-fi system.' },
    { title: 'Deliver', text: 'Prototype tests, developer handoff, and a post-launch review.' },
  ],
  quote,
  outcomeTitle: 'Less friction, more confidence, and numbers to prove it.',
  outcome: 'Results below come from the first eight weeks after launch, compared against the previous release. Figures are illustrative for this mock case study.',
  results: results.map(([value, label]) => ({ value, label })),
})

export const CASES: Record<number, Case> = {
  1: make('A calmer way to track your health every day', 'Lead Product Designer', 'Veridian Health', 'Mobile UX · Habit loops · Accessibility',
    [['38%', 'more daily check-ins'], ['12', 'core screens redesigned'], ['4.8', 'App Store rating']],
    'a health tracking app', 'Busy adults managing long-term health', 'Health apps fail when they feel like homework. The best screen is the one you finish in ten seconds.',
    [['+38%', 'daily check-ins'], ['-27%', 'onboarding drop-off'], ['4.8', 'store rating']]),
  2: make('Turning dense financial data into decisions', 'Senior Product Designer', 'Opus Finance', 'Dashboards · Data visualisation · B2B',
    [['62%', 'faster report creation'], ['9', 'chart patterns systemised'], ['3', 'enterprise pilots']],
    'a B2B finance dashboard', 'Finance teams reporting to executives', 'A chart is only finished when someone can act on it without asking what they are looking at.',
    [['-62%', 'time to report'], ['+41%', 'weekly active teams'], ['3', 'pilots converted']]),
  3: make('A visual identity built to move', 'Brand & Motion Designer', 'Kova', 'Visual identity · Motion · Guidelines',
    [['1', 'flexible logo system'], ['24', 'motion assets'], ['6 wks', 'concept to launch']],
    'a new brand identity', 'Founders launching to a skeptical market', 'Identity is not a logo. It is the feeling people remember when the logo is not on screen.',
    [['6 wks', 'to launch'], ['+54%', 'brand recall'], ['24', 'assets shipped']]),
  4: make('Making discovery feel like a conversation', 'Product Designer', 'Tempo Music', 'Android · Streaming · Personalisation',
    [['+22%', 'session length'], ['5', 'discovery surfaces'], ['2.1M', 'listeners reached']],
    'a music streaming app', 'Casual listeners who stop after three playlists', 'Recommendations should feel like a friend handing you headphones, not an algorithm handing you a list.',
    [['+22%', 'session length'], ['+31%', 'saved tracks'], ['-18%', 'churn']]),
  5: make('One design system across twelve analytics products', 'Design Systems Lead', 'Meridian Analytics', 'SaaS · Design system · Governance',
    [['140', 'components shipped'], ['12', 'products unified'], ['-45%', 'design debt']],
    'a company-wide design system', 'Designers and engineers on separate squads', 'A system succeeds when using it is easier than going around it.',
    [['-45%', 'design debt'], ['3x', 'faster handoff'], ['12', 'teams adopted']]),
  6: make('Editorial design that respects the reader', 'Editorial Designer', 'Forma', 'Print · Typography · Layout systems',
    [['96', 'pages composed'], ['3', 'type families'], ['2', 'print awards']],
    'a printed editorial series', 'Long-form readers who still buy paper', 'Good typography is invisible. Readers should remember the story, never the typeface.',
    [['96', 'pages shipped'], ['+33%', 'subscriptions'], ['2', 'awards']]),
  7: make('From sign-up to first win in under three minutes', 'UX Designer', 'Helix', 'UX flows · Onboarding · Experiments',
    [['3 min', 'to first value'], ['7', 'flow variants tested'], ['+46%', 'activation']],
    'an onboarding flow', 'New users deciding whether the product is worth their time', 'Onboarding is not a tour. It is the shortest path to the moment the product makes sense.',
    [['+46%', 'activation'], ['3 min', 'to first win'], ['-35%', 'support tickets']]),
  8: make('A pattern language for a geometric studio', 'Illustrator & Brand Designer', 'Studio Geom', 'Illustration · Patterns · Brand system',
    [['48', 'pattern tiles'], ['5', 'colour worlds'], ['1', 'unified system']],
    'an illustration and pattern system', 'A studio that needed its work to look like one voice', 'Constraints are what make a pattern language feel inevitable instead of random.',
    [['48', 'tiles delivered'], ['5', 'colour worlds'], ['+60%', 'inbound leads']]),
}
