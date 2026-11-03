export type Detail = {
  timeline: string
  team: string[]
  tools: string[]
  goals: string[]
  constraints: string[]
  research: { method: string; text: string }[]
  persona: { quote: string; who: string }
  insights: string[]
  decisions: { title: string; problem: string; decision: string; tradeoff: string }[]
  iterations: { label: string; before: string; after: string }[]
  solution: { title: string; text: string; pos: string }[]
  metrics: { label: string; before: string; after: string }[]
  learnings: string[]
  next: string[]
}

export const DETAILS: Record<number, Detail> = {
  1: {
    timeline: '14 weeks · Discovery to launch',
    team: ['1 Product designer (lead)', '1 Researcher', '3 iOS engineers', '1 PM', 'Clinical advisor'],
    tools: ['Figma', 'FigJam', 'Maze', 'Mixpanel', 'Lottie', 'Zeplin'],
    goals: ['Lift 30-day retention above 40%', 'Make a daily check-in possible in under 15 seconds', 'Meet WCAG AA for older users'],
    constraints: ['Medical wording had to pass clinical review', 'HealthKit data only, no new sensors', 'Two sprints of engineering before the spring release'],
    research: [
      { method: '14 interviews', text: 'Adults aged 35 to 68 living with hypertension or type 2 diabetes. Most had abandoned at least one tracking app within a month.' },
      { method: 'Analytics review', text: '61% of users who dropped off did so on the second day, right after a multi-step logging form.' },
      { method: 'Diary study', text: '9 participants logged their habits for 10 days. Mornings and just before bed were the only reliable windows.' },
    ],
    persona: { quote: 'I do not mind tracking. I mind being made to feel bad when I forget a day.', who: 'Interview participant, 52, type 2 diabetes' },
    insights: ['Guilt-based streaks caused people to quit, not to continue.', 'Large type and one primary action mattered more than rich charts.', 'People trusted the app more when it showed why a number mattered.'],
    decisions: [
      { title: 'Replace streaks with a weekly rhythm', problem: 'Broken streaks made users feel they had failed and many never returned.', decision: 'A weekly ring that rewards consistency across seven days, forgiving a missed day.', tradeoff: 'Lower short-term novelty, but a softer tone that tested better with older users.' },
      { title: 'One-tap check-in on the home screen', problem: 'Logging took five taps across three screens.', decision: 'A single card with three mood and symptom chips, expanding only if the user wants detail.', tradeoff: 'Less data per entry; we accepted it in exchange for volume and regularity.' },
      { title: 'Explain every metric in plain language', problem: 'Blood pressure ranges confused people and raised anxiety.', decision: 'Each reading gets a short, clinician-reviewed sentence and a calm colour state.', tradeoff: 'Added a review loop with the clinical advisor to every copy change.' },
    ],
    iterations: [
      { label: 'Home screen', before: 'Dense dashboard with seven widgets competing for attention.', after: 'One daily card, one weekly ring and a quiet list of recent entries.' },
      { label: 'Onboarding', before: 'Eleven questions before any value was shown.', after: 'Three questions, with the rest asked in context over the first week.' },
    ],
    solution: [
      { title: 'Daily check-in card', text: 'Three taps at most, large touch targets and haptic confirmation.', pos: 'center 20%' },
      { title: 'Weekly rhythm ring', text: 'Progress without punishment, with gentle prompts instead of alarms.', pos: 'center 55%' },
      { title: 'Plain-language insights', text: 'Every reading is explained, with a link to share it with a doctor.', pos: 'center 85%' },
    ],
    metrics: [
      { label: '30-day retention', before: '31%', after: '46%' },
      { label: 'Check-in time', before: '48 s', after: '11 s' },
      { label: 'Onboarding completion', before: '52%', after: '79%' },
    ],
    learnings: ['Tone is a feature. Changing wording moved retention more than changing layout.', 'Test with the oldest users first; younger users coped with anything.', 'Involve clinicians early so copy reviews never block a release.'],
    next: ['Medication reminders', 'Caregiver sharing', 'Apple Watch quick check-in'],
  },
  2: {
    timeline: '18 weeks · Research to enterprise pilots',
    team: ['2 Product designers', '1 Data analyst', '5 engineers', '1 PM', 'Customer success lead'],
    tools: ['Figma', 'Observable', 'Storybook', 'Amplitude', 'Dovetail'],
    goals: ['Cut time to build a board report by half', 'Make charts readable without a legend lookup', 'Win three enterprise pilots'],
    constraints: ['Existing data model could not change', 'Charts had to render 50k rows smoothly', 'Customers needed exports in the same branded format'],
    research: [
      { method: '11 stakeholder interviews', text: 'FP&A managers, controllers and two CFOs, covering how reports are really assembled each month.' },
      { method: 'Workflow shadowing', text: 'Four finance teams spent an average of 6.5 hours moving numbers between spreadsheets and slides.' },
      { method: 'Chart audit', text: 'We catalogued 63 charts in the product and found nine distinct jobs hiding behind them.' },
    ],
    persona: { quote: 'My CFO asks one question: so what changed? The tool should answer that before I do.', who: 'Senior FP&A manager, mid-size SaaS' },
    insights: ['Executives read variance first, totals second.', 'Annotation was the missing feature: people explained charts in separate emails.', 'Consistency of colour meaning mattered more than chart variety.'],
    decisions: [
      { title: 'Variance-first chart set', problem: 'Charts showed totals, forcing users to calculate change themselves.', decision: 'Nine chart patterns, each with a built-in comparison against budget or prior period.', tradeoff: 'Removed three popular but ambiguous chart types, which needed careful communication.' },
      { title: 'Inline annotations', problem: 'Context lived in email threads and slide notes.', decision: 'Comments and callouts attach to a data point and travel with exports.', tradeoff: 'Added permission complexity for who may edit narrative.' },
      { title: 'Semantic colour tokens', problem: 'The same green meant growth in one chart and a category in another.', decision: 'Colour is reserved for meaning: favourable, unfavourable, neutral. Categories use shape and label.', tradeoff: 'Less decorative dashboards, but far fewer misreads in testing.' },
    ],
    iterations: [
      { label: 'Report builder', before: 'Blank canvas with a long chart picker.', after: 'Guided templates for board, monthly close and forecast, editable after creation.' },
      { label: 'Data tables', before: 'Wide tables that required horizontal scrolling.', after: 'Pinned key columns, density toggle and sparklines for trends.' },
    ],
    solution: [
      { title: 'Variance dashboard', text: 'Budget, forecast and actuals side by side with the change called out.', pos: 'center 30%' },
      { title: 'Guided report builder', text: 'From template to board-ready deck in four steps.', pos: 'center 60%' },
      { title: 'Annotated exports', text: 'PDF and slide exports carry commentary and brand styling.', pos: 'center 90%' },
    ],
    metrics: [
      { label: 'Time to build report', before: '6.5 h', after: '2.5 h' },
      { label: 'Weekly active teams', before: '124', after: '175' },
      { label: 'Chart misread rate (testing)', before: '34%', after: '9%' },
    ],
    learnings: ['Ask what decision a chart supports before choosing a chart type.', 'Enterprise buyers sign for exports and trust, not for novelty.', 'Constraints on colour made the product feel more premium.'],
    next: ['Scenario modelling', 'Scheduled report delivery', 'Role-based report views'],
  },
  3: {
    timeline: '6 weeks · Brief to brand launch',
    team: ['1 Brand and motion designer', '1 Copywriter', 'Founders (2)', 'Freelance developer'],
    tools: ['Figma', 'Illustrator', 'After Effects', 'Lottie', 'Notion'],
    goals: ['Stand apart in a crowded fintech category', 'Create a mark that works from favicon to billboard', 'Give the team a system they can use without a designer'],
    constraints: ['Six weeks to launch event', 'Small budget with no photography shoot', 'Logo had to animate within a 2 second limit'],
    research: [
      { method: 'Founder workshop', text: 'A half-day session turning vague adjectives into three brand pillars: precise, kinetic, warm.' },
      { method: 'Category audit', text: '22 competitor identities mapped. Nearly all used the same blue and the same abstract sphere.' },
      { method: 'Audience interviews', text: 'Eight early customers described the brand they wished existed. Words repeated: fast, human, honest.' },
    ],
    persona: { quote: 'Everyone in this space looks the same. I would remember anyone who looked a bit alive.', who: 'Early customer, freelance consultant' },
    insights: ['Movement is the one ownable asset a small brand can afford.', 'Warmth could come from type and tone, not from stock imagery.', 'A flexible mark beats a fixed logo for social and product use.'],
    decisions: [
      { title: 'A logo built from a single moving line', problem: 'Static marks blended into the category.', decision: 'A monoline K that can draw itself, rotate and compress into an icon.', tradeoff: 'More production effort on animation and a stricter spec for static use.' },
      { title: 'A single signal colour', problem: 'Palettes were crowded and expensive to apply consistently.', decision: 'One electric accent on a neutral base, with tints reserved for data.', tradeoff: 'Less range for campaigns, offset by stronger recognition.' },
      { title: 'Motion principles, not just assets', problem: 'Teams would otherwise improvise animation and drift.', decision: 'Three motion rules with easing curves and durations documented.', tradeoff: 'Heavier guidelines, but self-serve for the team.' },
    ],
    iterations: [
      { label: 'Logo mark', before: 'Geometric badge that looked like a bank.', after: 'A fluid line that feels like a signature and animates on load.' },
      { label: 'Typography', before: 'Two display faces competing for attention.', after: 'One grotesk with distinct weights for headline and interface.' },
    ],
    solution: [
      { title: 'Flexible logo system', text: 'Primary, compact and icon versions with clear space rules.', pos: 'center 25%' },
      { title: 'Motion library', text: '24 assets covering loaders, transitions and social bumpers.', pos: 'center 55%' },
      { title: 'Guidelines site', text: 'A living guide with downloadable assets and do and do not examples.', pos: 'center 85%' },
    ],
    metrics: [
      { label: 'Aided brand recall', before: '21%', after: '75%' },
      { label: 'Launch assets produced', before: '0', after: '24' },
      { label: 'Social engagement rate', before: '1.2%', after: '3.9%' },
    ],
    learnings: ['A strong constraint, one line and one colour, produced a more distinctive result than a wide palette.', 'Hand over rules with the assets or the system dies in three months.', 'Prototype motion early so the logo is judged in motion, not as a still.'],
    next: ['Sound identity', 'Product iconography', 'Illustration style'],
  },
  4: {
    timeline: '12 weeks · Research to staged rollout',
    team: ['1 Product designer', '1 Researcher', '4 Android engineers', '2 Data scientists', '1 PM'],
    tools: ['Figma', 'ProtoPie', 'Firebase', 'Looker', 'UserTesting'],
    goals: ['Increase session length by 15%', 'Help casual listeners find music beyond their top three playlists', 'Keep the experience one-handed and fast'],
    constraints: ['Recommendation engine owned by another team', 'Android 8 and above support', 'Licensing limited what artwork could be shown'],
    research: [
      { method: '20 listener interviews', text: 'Casual listeners aged 18 to 34 who open the app daily but rarely search.' },
      { method: 'Behaviour analysis', text: '70% of sessions started from one of three playlists and ended within 20 minutes.' },
      { method: 'Competitive teardown', text: 'We compared discovery patterns across five services and mapped where each asked for effort.' },
    ],
    persona: { quote: 'I want someone to say, try this, and then I will tell you if it is good.', who: 'Interview participant, 26, daily commuter' },
    insights: ['People want suggestions framed by mood and moment, not genre.', 'Skipping is feedback; the app was not listening to it.', 'Explaining why something is recommended raised trust and play rate.'],
    decisions: [
      { title: 'Mood-first discovery', problem: 'Genre browsing felt like a catalogue.', decision: 'A home feed organised by moment: commute, focus, workout, wind down.', tradeoff: 'Required new tagging work from the data team.' },
      { title: 'Skips shape the next track', problem: 'Skipping was treated as noise.', decision: 'A lightweight reason chip on the second skip adjusts the queue immediately.', tradeoff: 'One extra prompt, shown sparingly to avoid fatigue.' },
      { title: 'Why this track?', problem: 'Recommendations felt arbitrary.', decision: 'A one-line reason under each suggestion, such as because you replayed this artist.', tradeoff: 'Space cost on small screens, solved with progressive disclosure.' },
    ],
    iterations: [
      { label: 'Home feed', before: 'Long list of horizontally scrolling shelves.', after: 'A focused hero card with three moods, then a calm vertical feed.' },
      { label: 'Now playing', before: 'Controls spread across the screen, hard to reach with one hand.', after: 'Core controls in the thumb zone, queue accessible with a swipe.' },
    ],
    solution: [
      { title: 'Moments feed', text: 'Music chosen for what you are doing, not what you once liked.', pos: 'center 30%' },
      { title: 'Skip feedback', text: 'Two taps teach the queue, no settings required.', pos: 'center 60%' },
      { title: 'Explained picks', text: 'Short reasons that build trust in suggestions.', pos: 'center 90%' },
    ],
    metrics: [
      { label: 'Average session length', before: '19 min', after: '23 min' },
      { label: 'Saved tracks per user', before: '3.2', after: '4.2' },
      { label: '60-day churn', before: '27%', after: '22%' },
    ],
    learnings: ['Explaining a recommendation did more for trust than improving it slightly.', 'Roll out in stages; the first test taught us the skip prompt was too frequent.', 'Design with the data team from week one, not after the interface is set.'],
    next: ['Shared listening', 'Car mode', 'Lyric-based discovery'],
  },
  5: {
    timeline: '9 months · Audit to company-wide adoption',
    team: ['2 Systems designers', '3 Front-end engineers', '1 Accessibility specialist', '1 PM', '12 product squads as contributors'],
    tools: ['Figma', 'Storybook', 'Style Dictionary', 'Chromatic', 'GitHub', 'Notion'],
    goals: ['Unify twelve products under one language', 'Reduce design and front-end duplication', 'Reach AA accessibility by default'],
    constraints: ['Products used three different front-end frameworks', 'No freeze on feature delivery', 'Squads had their own roadmaps and priorities'],
    research: [
      { method: 'Interface audit', text: '1,400 screenshots catalogued: 27 button styles, 41 shades of grey and six date pickers.' },
      { method: 'Squad interviews', text: 'Designers and engineers from all twelve squads described what slowed them down.' },
      { method: 'Cost analysis', text: 'Duplicate component work consumed an estimated 18% of front-end capacity.' },
    ],
    persona: { quote: 'I do not hate the design system. I hate waiting two sprints for a component I need now.', who: 'Front-end engineer, payments squad' },
    insights: ['Adoption depends on speed of contribution more than quality of documentation.', 'Tokens could unify look across frameworks before components did.', 'Governance needed to be lightweight or squads would route around it.'],
    decisions: [
      { title: 'Tokens first, components second', problem: 'Rewriting components across three frameworks would take a year.', decision: 'Ship design tokens to every product in month two, then migrate components gradually.', tradeoff: 'Visible consistency arrived early, but deep consistency took longer.' },
      { title: 'Open contribution model', problem: 'A central team became a bottleneck.', decision: 'Squads can propose components through a clear template and a 5 day review SLA.', tradeoff: 'More review load on the core team, accepted for faster growth.' },
      { title: 'Accessibility built in', problem: 'Accessibility was patched per product.', decision: 'Every component ships with keyboard behaviour, ARIA patterns and contrast checks.', tradeoff: 'Slower first release of each component, far fewer later fixes.' },
    ],
    iterations: [
      { label: 'Component API', before: 'Props named differently in each product.', after: 'A single naming convention and documented variants.' },
      { label: 'Documentation', before: 'Static pages that went stale.', after: 'Live Storybook with usage guidance, do and do not examples, and code snippets.' },
    ],
    solution: [
      { title: 'Token pipeline', text: 'One source of truth exported to web, iOS and Android.', pos: 'center 25%' },
      { title: '140 components', text: 'Documented, tested and accessible, with visual regression checks.', pos: 'center 55%' },
      { title: 'Contribution flow', text: 'A clear path from idea to released component.', pos: 'center 85%' },
    ],
    metrics: [
      { label: 'Design debt items', before: '312', after: '172' },
      { label: 'Handoff time per feature', before: '4.5 days', after: '1.5 days' },
      { label: 'Products on shared system', before: '2', after: '12' },
    ],
    learnings: ['A design system is a product with users; treat adoption as the metric.', 'Win trust with quick wins such as tokens before asking for migrations.', 'Say no gracefully; not every one-off belongs in the system.'],
    next: ['Figma variables parity', 'Motion tokens', 'Data visualisation kit'],
  },
  6: {
    timeline: '10 weeks · Concept to press',
    team: ['1 Editorial designer', '2 Editors', '3 Photographers', 'Print production partner'],
    tools: ['InDesign', 'Illustrator', 'Figma', 'Pantone guides', 'Proofing press'],
    goals: ['Design a 96 page series that feels considered in the hand', 'Build a layout system editors can reuse', 'Stay inside a tight print budget'],
    constraints: ['Two spot colours plus black', 'Uncoated stock chosen for feel and cost', 'Four different content types per issue'],
    research: [
      { method: 'Reader interviews', text: 'Twelve subscribers on why they still buy print and what they skip.' },
      { method: 'Reading tests', text: 'Compared line lengths and sizes with printed samples and noted where readers lost their place.' },
      { method: 'Archive review', text: 'Analysed the previous five issues for inconsistent spacing and awkward breaks.' },
    ],
    persona: { quote: 'I buy it to slow down. If it looks busy, it is just another screen on paper.', who: 'Subscriber, architect' },
    insights: ['Readers valued generous margins and a predictable rhythm.', 'Pull quotes and images worked best at a few repeated sizes.', 'Editors needed templates, not blank pages.'],
    decisions: [
      { title: 'A twelve column grid', problem: 'Old issues used ad hoc layouts that drifted.', decision: 'A flexible twelve column grid with fixed baseline and four layout archetypes.', tradeoff: 'Less freedom per page, more cohesion across the issue.' },
      { title: 'Three type families, strict roles', problem: 'Fonts were used interchangeably.', decision: 'A serif for text, a grotesk for labels, a mono for data, each with set sizes.', tradeoff: 'Required licensing and careful pairing, but gave a clear hierarchy.' },
      { title: 'Colour as wayfinding', problem: 'Sections blurred together.', decision: 'Each section carries one spot colour, used only for headings and rules.', tradeoff: 'Limited the palette but made navigation intuitive.' },
    ],
    iterations: [
      { label: 'Opening spread', before: 'Full-bleed image with small text that got lost in the gutter.', after: 'Image on one page, large title on the other, clear space around both.' },
      { label: 'Body text', before: '9 pt on tight leading, tiring over long articles.', after: '9.5 pt with 14 pt leading and a narrower measure.' },
    ],
    solution: [
      { title: 'Layout archetypes', text: 'Four templates cover features, interviews, essays and portfolios.', pos: 'center 25%' },
      { title: 'Type system', text: 'Clear roles and sizes keep long reads comfortable.', pos: 'center 55%' },
      { title: 'Production kit', text: 'Master pages, swatches and a checklist for printer-ready files.', pos: 'center 85%' },
    ],
    metrics: [
      { label: 'Layout time per issue', before: '3 weeks', after: '1.5 weeks' },
      { label: 'Subscriptions', before: '1,820', after: '2,420' },
      { label: 'Printer corrections', before: '23', after: '4' },
    ],
    learnings: ['Test type on actual paper; screens flatter everything.', 'Give editors constraints they can understand and they will protect the design.', 'Plan for the printer early to avoid expensive late changes.'],
    next: ['Digital edition', 'Special issue format', 'Cover design series'],
  },
  7: {
    timeline: '8 weeks · Audit to experiment results',
    team: ['1 UX designer', '1 Growth PM', '2 Engineers', '1 Data analyst', '1 Content designer'],
    tools: ['Figma', 'Optimizely', 'Mixpanel', 'Hotjar', 'Maze'],
    goals: ['Raise activation by 30%', 'Get a new user to first value in under 3 minutes', 'Reduce onboarding support tickets'],
    constraints: ['Pricing page and sign-up could not change', 'Experiments had to run in parallel on live traffic', 'Product required integration setup before value'],
    research: [
      { method: 'Funnel analysis', text: '44% of new users left between account creation and connecting their first data source.' },
      { method: 'Session recordings', text: '120 recordings showed users hesitating on the integration screen and searching help docs.' },
      { method: 'Exit survey', text: 'Of 230 responses, the top reason was unclear what to do next.' },
    ],
    persona: { quote: 'I signed up to see if it works. I did not sign up to read a manual.', who: 'Trial user, operations lead' },
    insights: ['Users wanted to see value before configuring anything.', 'A sample workspace answered the question of what the product is for.', 'Progress and a visible finish line reduced abandonment.'],
    decisions: [
      { title: 'Start with a sample workspace', problem: 'An empty product gave no sense of value.', decision: 'Pre-populated demo data lets users explore before connecting their own source.', tradeoff: 'Required maintaining demo data and a clear switch to real data.' },
      { title: 'A three-step checklist', problem: 'Users did not know what success looked like.', decision: 'A persistent checklist with a visible first win and estimated time per step.', tradeoff: 'Adds interface weight, dismissible after completion.' },
      { title: 'Defer non-essential questions', problem: 'Eleven profile questions came before the product.', decision: 'Ask only role and goal, collecting the rest after activation.', tradeoff: 'Less early segmentation data for marketing.' },
    ],
    iterations: [
      { label: 'Welcome screen', before: 'A product tour with six slides most users skipped.', after: 'A single prompt asking for the user goal and routing to the right path.' },
      { label: 'Integration step', before: 'A long list of 40 connectors.', after: 'Top four suggested by role, with search for the rest.' },
    ],
    solution: [
      { title: 'Goal-based welcome', text: 'One question that personalises the first session.', pos: 'center 25%' },
      { title: 'Sample workspace', text: 'Immediate value with realistic data to explore.', pos: 'center 55%' },
      { title: 'First win checklist', text: 'Three clear steps with progress and a celebration moment.', pos: 'center 85%' },
    ],
    metrics: [
      { label: 'Activation rate', before: '28%', after: '41%' },
      { label: 'Time to first value', before: '9 min', after: '2 min 50 s' },
      { label: 'Onboarding tickets per 100 signups', before: '17', after: '11' },
    ],
    learnings: ['Seven variants taught more than one perfect guess; run small tests early.', 'Show value first and ask for effort second.', 'Qualitative recordings explained the why behind every funnel number.'],
    next: ['Role-specific templates', 'In-product help', 'Lifecycle emails'],
  },
  8: {
    timeline: '7 weeks · Exploration to delivered library',
    team: ['1 Illustrator and brand designer', 'Studio director', '1 Developer for web export'],
    tools: ['Illustrator', 'Figma', 'Procreate', 'Rive', 'Notion'],
    goals: ['Make the studio work read as one voice', 'Deliver a reusable pattern library', 'Support print, web and motion use'],
    constraints: ['Five colour worlds from existing client work', 'Patterns must tile seamlessly', 'Small team with no dedicated brand manager'],
    research: [
      { method: 'Portfolio audit', text: 'Reviewed 40 past projects and found recurring shapes the studio already loved.' },
      { method: 'Studio workshop', text: 'Sorted favourite work into three families: grid, curve and cut.' },
      { method: 'Client feedback', text: 'Five clients described what they remembered about the studio. Answers: bold, playful, precise.' },
    ],
    persona: { quote: 'We make careful work, but our own brand looked like a different studio every month.', who: 'Studio director' },
    insights: ['A small kit of shapes could generate endless variety.', 'Colour needed rules to avoid chaos, such as a maximum of three per composition.', 'Motion could animate the same shapes with minimal extra work.'],
    decisions: [
      { title: 'A kit of twelve base shapes', problem: 'Ad hoc illustration made each piece feel new.', decision: 'Twelve shapes built on one grid, combined through documented rules.', tradeoff: 'Less spontaneity, offset by speed and unity.' },
      { title: 'Five colour worlds', problem: 'Palettes changed per project.', decision: 'Five curated palettes with fixed roles for background, shape and accent.', tradeoff: 'Some past work needed recolouring for consistency.' },
      { title: 'Seamless tiling by default', problem: 'Patterns broke at edges in print and web.', decision: 'Every tile is built on a square repeat with tested bleed and export presets.', tradeoff: 'Constrained tile size, simpler production.' },
    ],
    iterations: [
      { label: 'Pattern density', before: 'Busy patterns that overpowered content.', after: 'Three density levels from quiet to bold, chosen by context.' },
      { label: 'Colour usage', before: 'Up to six colours per piece.', after: 'Three colours maximum with contrast checks for text.' },
    ],
    solution: [
      { title: 'Base shape kit', text: 'Twelve shapes that combine into endless compositions.', pos: 'center 25%' },
      { title: '48 pattern tiles', text: 'Print-ready and web-ready with seamless repeat.', pos: 'center 55%' },
      { title: 'Usage guide', text: 'Rules and examples so anyone at the studio can compose on brand.', pos: 'center 85%' },
    ],
    metrics: [
      { label: 'Time to produce a layout', before: '2 days', after: '5 hours' },
      { label: 'Inbound leads per month', before: '10', after: '16' },
      { label: 'Pattern tiles delivered', before: '0', after: '48' },
    ],
    learnings: ['Rules are what make variety feel intentional.', 'Test patterns at tiny and huge sizes before approving.', 'A short usage guide is worth more than a long brand book.'],
    next: ['Animated pattern set', 'Merch and packaging', 'Open-source starter pack'],
  },
}
