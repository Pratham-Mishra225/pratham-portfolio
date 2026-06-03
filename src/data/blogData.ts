export interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  publishedDate: string;
  fullContent: string;
}

export const blogData: Blog[] = [
  {
    id: 1,
    slug: "how-i-think-about-kpis-that-actually-move-decisions",
    title: "How I think about KPIs that actually move decisions",
    category: "Analytics",
    readTime: "6 min",
    description:
      "Most dashboards measure what's easy. Here's a framework for measuring what matters.",
    publishedDate: "May 12, 2025",
    fullContent: `
<p>Walk into any data team, and you'll find dashboards. Hundreds of them. Revenue by region. Sessions by day. Bounce rate. Average order value. Churn percentage. All of it beautifully rendered in Tableau or Looker or Power BI, automatically refreshing, always available.</p>

<p>And yet — almost none of it moves decisions.</p>

<p>That's a provocation, and I mean it seriously. Most metrics in most dashboards are there because someone once asked for them, they were easy to track, and they stuck around. The question nobody asks enough is: <em>if this number changed, would anyone do anything differently?</em></p>

<h2>The decision test</h2>

<p>Every KPI I work with now gets put through what I call the decision test. It's simple: state the metric, then finish this sentence — "If this number went up/down by X%, the team would ___."</p>

<p>If you can't finish that sentence with a concrete action, the metric isn't a KPI. It's a vanity metric wearing a KPI's badge. Impressions, total sign-ups, page views — these are outputs, not decision triggers. They feel good when they go up, but they don't tell you what to do when they go down.</p>

<p>A real KPI creates a decision tree. Customer acquisition cost (CAC) crossing a threshold means you pause the current campaign and run experiments. Week-3 retention dropping below a threshold means you ship a re-engagement flow and review onboarding. The metric has a next step embedded in it.</p>

<h2>Leading vs. lagging — and why most teams get this backwards</h2>

<p>Revenue is the ultimate lagging indicator. By the time it drops, a dozen upstream decisions have already failed. Smart analytics teams obsess over leading indicators — the early signals that predict the lagging outcomes before they materialize.</p>

<p>Here's a pattern I see everywhere: a team tracks monthly revenue (lagging), weekly active users (slightly less lagging), and maybe NPS (a survey that takes weeks to collect). But they don't track the <em>behaviors</em> that reliably predict whether those numbers will move. Days-to-activation. Feature adoption depth in week 1. Support ticket topics trending upward. The ratio of users who complete the core workflow on day 1 versus day 7.</p>

<p>The framework I use: for every lagging metric your organization cares about, map at least two measurable leading indicators with a documented lag time. "When X happens, Y tends to follow in approximately Z weeks." That's a hypothesis. Over time, it becomes infrastructure.</p>

<h2>The hierarchy of metrics</h2>

<p>Not all metrics deserve equal attention. I think about them in three tiers:</p>

<p><strong>North Star Metric:</strong> One number that captures the core value the product delivers to users. For Spotify, it's probably something like time spent listening. For a B2B SaaS, it might be workflows completed per user per week. This metric should be — if the product is working — a reliable proxy for business health. Every team should know it. Every sprint goal should connect to it.</p>

<p><strong>Driver Metrics:</strong> Four to six metrics that demonstrably affect the North Star. These are the levers. When they change, the North Star moves. These live in executive dashboards and weekly reviews.</p>

<p><strong>Diagnostic Metrics:</strong> The deep-cut numbers you pull when something breaks. Cohort retention curves. Funnel conversion by traffic source. These aren't on dashboards — they live in notebooks and queries, pulled on demand when you're debugging a problem.</p>

<p>The failure mode I see: organizations promote diagnostic metrics to driver status. Suddenly the team is optimizing for things that correlate with the real problem instead of addressing it directly. Conversion rate by page becomes the objective instead of understanding <em>why</em> users aren't converting.</p>

<h2>The denominator problem</h2>

<p>One of the subtlest sources of misleading KPIs is the denominator. "Monthly active users" sounds great — but active defined how? Anyone who logged in? Anyone who completed a meaningful action? If your definition of active is a login, you can inflate MAU by triggering more login prompts. The number goes up. Nothing valuable changed.</p>

<p>I've started requiring explicit denominator documentation for every metric: what counts, what doesn't, and what edge cases are excluded. A metric without a clear denominator definition is a metric waiting to be gamed — intentionally or accidentally.</p>

<h2>Building the right measurement culture</h2>

<p>Technical rigor is only half the problem. The other half is organizational. Even with perfect metrics, decision-making fails if the team doesn't trust the data, doesn't review it regularly, or doesn't have authority to act on what they see.</p>

<p>The best analytics setups I've studied share a common pattern: a small set of agreed-upon metrics, reviewed on a fixed cadence, with clear ownership. Not fifty metrics reviewed whenever someone has time — five metrics, every Monday, with someone accountable for each.</p>

<p>Measurement without accountability is theater. When every metric is everyone's problem, it's really no one's problem. Assign a metric owner. That person is responsible for explaining movements, flagging anomalies, and driving the conversation about what to do next.</p>

<h2>The question that changed how I think about this</h2>

<p>A mentor once asked me: "If you had to fly the business using only five instruments — like a cockpit — which five would you pick?" Not twenty. Not fifty. Five.</p>

<p>That constraint is clarifying. It forces you to think about what you actually need to make the next decision, versus what's just interesting to know. Most of what lives in dashboards is interesting. Very little of it is necessary. The discipline of measurement is learning to tell the difference — and having the courage to remove what doesn't pass the test.</p>

<p>Start there. Build your dashboards from that constraint, not toward it.</p>
    `,
  },
  {
    id: 2,
    slug: "the-underrated-power-of-sql-window-functions",
    title: "The underrated power of SQL window functions",
    category: "Technology",
    readTime: "8 min",
    description:
      "Window functions changed how I model analytical questions in production data.",
    publishedDate: "Apr 28, 2025",
    fullContent: `
<p>There's a moment every analyst has — the moment you discover <code>ROW_NUMBER()</code>, then <code>RANK()</code>, then <code>LAG()</code>, and suddenly the 30-line query you'd been writing for three hours collapses into eight lines that actually do what you wanted. That moment, for me, was the gateway into a part of SQL that most tutorials either skip or rush past: window functions.</p>

<p>This post is for the analyst who knows basic SQL but hasn't spent serious time with window functions yet. My aim is to show you not just how they work, but the kinds of analytical problems they unlock — problems that are genuinely hard to solve elegantly any other way.</p>

<h2>What makes window functions different</h2>

<p>Regular aggregate functions collapse rows. <code>SUM(revenue)</code> over a group gives you one row per group. That's useful, but sometimes you want the aggregate <em>and</em> the original rows. You want each transaction alongside the running total. You want each user's session alongside their average session length. That's what window functions do — they perform a calculation across a set of related rows while preserving the original row structure.</p>

<p>The syntax has three parts worth understanding:</p>

<pre><code>FUNCTION() OVER (
  PARTITION BY column
  ORDER BY column
  ROWS/RANGE BETWEEN ... AND ...
)</code></pre>

<p><code>PARTITION BY</code> is like <code>GROUP BY</code>, but without collapsing rows. <code>ORDER BY</code> defines the sequence within each partition. The frame clause (<code>ROWS BETWEEN</code>) defines how far back and forward the window extends. Together, these three give you enormous flexibility.</p>

<h2>Running totals and moving averages</h2>

<p>The most common window function use case is running totals. If you have daily revenue and want a cumulative sum:</p>

<pre><code>SELECT
  date,
  revenue,
  SUM(revenue) OVER (ORDER BY date) AS cumulative_revenue
FROM daily_revenue</code></pre>

<p>Clean. No self-join. No subquery. The frame defaults to <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, which means "everything up to and including this row."</p>

<p>For a 7-day moving average, you adjust the frame:</p>

<pre><code>SELECT
  date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS rolling_7day_avg
FROM daily_revenue</code></pre>

<p>This is far more readable than the equivalent self-join, and in most query engines, it's also faster.</p>

<h2>Cohort analysis and retention</h2>

<p>Here's where window functions start to shine for product analytics. Cohort retention analysis — figuring out what percentage of users who signed up in week 1 are still active in week 4 — traditionally requires multiple CTEs or subqueries. Window functions make the first step clean.</p>

<pre><code>SELECT
  user_id,
  event_date,
  MIN(event_date) OVER (PARTITION BY user_id) AS first_event_date,
  DATEDIFF(event_date, MIN(event_date) OVER (PARTITION BY user_id)) AS days_since_first
FROM user_events</code></pre>

<p>With <code>days_since_first</code> in hand, you can bucket users into cohorts and compute retention rates with a simple group-by downstream. The window function eliminates the self-join that would otherwise be required to attach <code>first_event_date</code> to every row.</p>

<h2>Deduplication with ROW_NUMBER</h2>

<p>One of the most practical everyday uses: deduplication. Say you have a table with duplicate records (maybe from an imperfect ETL process), and you want to keep only the most recent version of each record per user:</p>

<pre><code>WITH ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY updated_at DESC
    ) AS rn
  FROM raw_users
)
SELECT * FROM ranked WHERE rn = 1</code></pre>

<p>This pattern — ROW_NUMBER inside a CTE, then filter on rn = 1 — is one of the most versatile in analytical SQL. It works for deduplication, for picking the first/last event per user, for selecting the most recent record per session.</p>

<h2>Lead, lag, and period-over-period comparisons</h2>

<p><code>LAG()</code> and <code>LEAD()</code> let you access the previous or next row's value without a self-join. This is powerful for period-over-period comparisons:</p>

<pre><code>SELECT
  week,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY week) AS prev_week_revenue,
  revenue - LAG(revenue, 1) OVER (ORDER BY week) AS week_over_week_change,
  ROUND(
    (revenue - LAG(revenue, 1) OVER (ORDER BY week)) /
    NULLIF(LAG(revenue, 1) OVER (ORDER BY week), 0) * 100,
    2
  ) AS pct_change
FROM weekly_revenue</code></pre>

<p>Note the <code>NULLIF(..., 0)</code> — essential for avoiding division-by-zero errors when a prior period had zero revenue.</p>

<h2>Percentile rank and distribution analysis</h2>

<p><code>PERCENT_RANK()</code> and <code>NTILE()</code> are underused gems for understanding distribution. Want to know which decile each customer falls into by lifetime value?</p>

<pre><code>SELECT
  customer_id,
  lifetime_value,
  NTILE(10) OVER (ORDER BY lifetime_value) AS decile
FROM customer_ltv</code></pre>

<p>Now you can segment your top 10% easily, compare behaviors across deciles, or build targeted campaigns. No complex CASE WHEN with hardcoded thresholds — just a window function.</p>

<h2>Gaps and islands</h2>

<p>One of the more advanced patterns window functions enable is detecting "gaps and islands" — consecutive sequences and breaks in sequential data. Useful for session analysis, subscription continuity checks, and more. The classic pattern:</p>

<pre><code>SELECT
  user_id,
  activity_date,
  activity_date - ROW_NUMBER() OVER (
    PARTITION BY user_id ORDER BY activity_date
  ) AS grp
FROM user_activity</code></pre>

<p>Rows that are consecutive get the same <code>grp</code> value. Group by <code>user_id, grp</code> and you can identify contiguous activity streaks. This is genuinely hard to do without window functions.</p>

<h2>When not to use them</h2>

<p>Window functions have overhead — they require the query engine to materialize the partition and sort it before computing. On very large tables with many partitions, they can be expensive. Profile your queries. Use <code>EXPLAIN</code>. Sometimes a well-indexed lookup table is faster.</p>

<p>Also: not all SQL dialects support all frame types equally well. MySQL's support has historically lagged behind PostgreSQL and BigQuery. Know your environment.</p>

<h2>The mental model shift</h2>

<p>The real value of learning window functions isn't the functions themselves — it's the way they change how you think about analytical problems. Instead of reaching for a self-join or a correlated subquery, you start asking: "Can I express this as a relationship between a row and its partition?" Usually you can. And when you can, the query is clearer, more maintainable, and often faster.</p>

<p>That mental shift is worth the investment. Start with <code>ROW_NUMBER</code>. Move to <code>LAG</code>. Work your way to frame-aware aggregates. Each one will expand what you can express in a single query — and what you can see in your data.</p>
    `,
  },
  {
    id: 3,
    slug: "frameworks-arent-answers-theyre-scaffolding",
    title: "Frameworks aren't answers — they're scaffolding",
    category: "Business",
    readTime: "5 min",
    description:
      "Porter, SWOT, and 5-Whys are starting points, not conclusions.",
    publishedDate: "Apr 10, 2025",
    fullContent: `
<p>In almost every business course, frameworks arrive with a kind of implicit authority. Porter's Five Forces. The BCG Matrix. SWOT. McKinsey's 7-S. They're taught as if applying them correctly produces insight, like a formula that outputs an answer when you fill in the variables.</p>

<p>I've come to believe that framing is backwards. Frameworks are not answer machines. They are thinking aids — scaffolding that helps you structure observation and conversation. The mistake isn't learning them. The mistake is trusting them to replace judgment.</p>

<h2>What frameworks actually do well</h2>

<p>Before I critique them, let me be fair about what they genuinely do well. A good framework forces completeness. SWOT analysis, for all its simplicity, stops a team from only talking about strengths and ignoring threats. The Five Forces stops strategists from only thinking about direct competitors and forces them to consider suppliers, buyers, substitutes, and new entrants.</p>

<p>That's real value. In a two-hour strategy session with a roomful of senior people, a framework is an agenda — a guarantee that certain questions get raised even if no one naturally thinks to raise them. That's not nothing. That's actually quite useful.</p>

<p>Frameworks also create shared vocabulary. When everyone on a team knows what "threat of substitution" means in the Porter sense, you can have faster, more precise conversations. The framework is a compression algorithm for accumulated strategic thinking. Why reinvent that vocabulary every time?</p>

<h2>Where they fail</h2>

<p>The failure mode is when the framework becomes the output rather than the input to thinking. I've sat in presentations where a team had done a thorough Five Forces analysis — rated each force as high, medium, or low — and declared the analysis done. Competitive rivalry: high. Threat of new entrants: medium. Bargaining power of suppliers: low. And… what does that tell us to do?</p>

<p>Nothing. The framework organized the landscape. It didn't tell you whether to enter the market, which segment to target, what capability to build, or where to price. Those decisions require judgment, contextual knowledge, and often empirical testing. The framework can't substitute for any of that.</p>

<p>SWOT is perhaps the most abused. It becomes a brainstorming exercise that produces a four-quadrant list of things people already knew, followed by a recommendation that conveniently favors whatever the team was already planning to do. The framework provided a surface of analytical legitimacy for a conclusion that was predetermined.</p>

<h2>The 5-Whys problem</h2>

<p>The 5-Whys is a root cause analysis technique from lean manufacturing. You ask "why" five times in succession to drill down from a symptom to a root cause. It's powerful in controlled manufacturing environments where cause-and-effect relationships are relatively deterministic.</p>

<p>In complex business or product contexts, it's often misleading. The chain of "whys" is not objectively determined — it reflects the mental model of whoever is answering. Two analysts can apply 5-Whys to the same problem and arrive at completely different root causes, both logically consistent, neither objectively correct. The framework gives the process a feeling of rigor without actually providing it.</p>

<p>This doesn't mean root cause analysis is useless — it means the tool doesn't substitute for domain expertise, empirical data, and genuine intellectual humility about how much you can know from reasoning alone.</p>

<h2>How I use frameworks now</h2>

<p>I still use frameworks. All the time. But I treat them as starting points and conversation anchors, not endpoints.</p>

<p>My process: apply the framework to surface the questions, then answer those questions with data and domain knowledge. SWOT gives me a list of questions. What are the actual threats? How material are they, and over what time horizon? What's the evidence? The SWOT boxes are headers, not conclusions.</p>

<p>I also try to be conscious of what each framework was designed for and where it breaks down. Porter's Five Forces was designed for industry-level competitive analysis of relatively stable markets. It was not designed for platform businesses, two-sided markets, or fast-moving technology sectors where the competitive set can change in eighteen months. Using it uncritically in those contexts can actively mislead.</p>

<h2>The deeper lesson</h2>

<p>The real skill in business analysis isn't knowing frameworks — it's knowing when to apply which framework, what questions it's good at surfacing, what it systematically misses, and when to set it aside entirely and reason from first principles.</p>

<p>That skill is harder to teach and harder to demonstrate on a slide deck. It accumulates through practice, through seeing frameworks misapplied, through watching smart people reach wrong conclusions because they trusted the structure of an analysis more than its substance.</p>

<p>Use frameworks. Learn them well. But wear them lightly. The scaffold is not the building.</p>
    `,
  },
  {
    id: 4,
    slug: "validating-an-idea-in-14-customer-conversations",
    title: "Validating an idea in 14 customer conversations",
    category: "Entrepreneurship",
    readTime: "7 min",
    description:
      "A repeatable script I used to test 2 startup concepts on campus.",
    publishedDate: "Mar 22, 2025",
    fullContent: `
<p>Last semester, I ran two idea validation sprints — each targeting a different problem I'd observed on campus. The first was a scheduling tool for student organizations. The second was a peer skill-exchange platform. One had real demand. One didn't. The process that helped me figure out which was which: 14 carefully structured customer conversations.</p>

<p>This isn't a post about the ideas — one is still in development, one is dead. It's a post about the process, because I found a repeatable approach that cuts through a lot of the noise that usually surrounds "market research."</p>

<h2>Why most early-stage research fails</h2>

<p>The most common mistake is asking people if they would use your product. The answer is almost always yes. People are polite. They don't want to disappoint you. They're also bad at predicting their own behavior, especially for hypothetical products they've never seen.</p>

<p>Mom Test principle, for those unfamiliar: never ask your mom (or anyone) if they like your idea. Ask about their life. The signal is in behavior and past experience, not in hypothetical preference. "Would you use an app that did X?" is a bad question. "Walk me through the last time you tried to solve X" is a good one.</p>

<p>The other failure mode: confirmation bias. You go in hoping to hear that your idea is great. You emphasize questions that make it easy for people to say yes. You discount the no signals because they're uncomfortable. Customer research that confirms a bad idea is more dangerous than doing no research at all — it gives you false confidence.</p>

<h2>The script I used</h2>

<p>I structured each conversation around four questions, with follow-ups that varied by response:</p>

<p><strong>1. "Tell me about the last time you experienced [the problem domain]."</strong></p>
<p>Not "do you have this problem" — "tell me about the last time." This forces specificity. Vague answers ("yeah, I guess it's sometimes annoying") are signal. Detailed, animated stories ("oh god, last Tuesday I spent two hours on this and still didn't solve it") are signal too — but much stronger signal.</p>

<p><strong>2. "What did you do about it?"</strong></p>
<p>The response tells you what existing solutions they already use or considered. If they already have a satisfactory workaround, your product is competing with that workaround, not with the raw problem. Also: if they did nothing, that's data. Severity of pain correlates with how much effort they put into solving it.</p>

<p><strong>3. "What was the most frustrating part of that experience?"</strong></p>
<p>This surfaces the specific pain points, not the general category of pain. You're looking for the crack in the current solution — the thing your product might specifically address. You're also listening for emotion. Frustration and intensity of language predict willingness to pay and willingness to change behavior.</p>

<p><strong>4. "If this problem were magically solved, what would that be worth to you?"</strong></p>
<p>Not "what would you pay for a product that did X." Magic solution, no implementation details. This separates pain intensity from price anchoring. You can always talk price later. First you need to know if the problem is worth solving from their perspective.</p>

<h2>What I learned from the scheduling tool interviews</h2>

<p>I interviewed 7 student organization leaders. Five of them gave me detailed, specific stories about scheduling conflicts, availability coordination, and calendar chaos. They were using spreadsheets, group chats, and Doodle polls — none satisfactorily. Two of them had built their own systems (a spreadsheet plus a form) that were failing as their org scaled.</p>

<p>Strong signal: real problem, inadequate existing solutions, specific and emotional stories.</p>

<p>I also asked: "Have you ever paid for any tool that helped with organization management?" Three of the five said yes — one was paying for Notion Pro, one had used Eventbrite for ticketing. Demonstrated willingness to pay for adjacent tools is a strong proxy for willingness to pay in this space.</p>

<h2>What I learned from the skill-exchange interviews</h2>

<p>I interviewed 7 students who I thought had diverse skill sets and had expressed interest in learning new things. The conversations were polite, even enthusiastic about the concept. But here's what I noticed:</p>

<ul>
<li>Only 2 could recall a specific time they had sought out peer skill-exchange</li>
<li>When asked what they did about skill gaps, most said "watched YouTube" or "asked a friend"</li>
<li>None had paid for any peer learning tool</li>
<li>The most common response to "what would a magic solution be worth": "I'd probably use it if it were free"</li>
</ul>

<p>Classic pain that isn't really pain. The problem domain (learning new skills) is real, but the intensity of pain around peer exchange specifically was low. People had satisfactory substitutes. There was no crack to wedge into.</p>

<h2>The decision rule I used</h2>

<p>After each round of 7 interviews, I used a simple scoring rubric:</p>

<ul>
<li><strong>Specificity of stories:</strong> Could they describe a real recent instance? (0–2)</li>
<li><strong>Effort spent on existing solutions:</strong> Did they try to fix it themselves? (0–2)</li>
<li><strong>Emotional intensity:</strong> Were they frustrated, animated, genuinely bothered? (0–2)</li>
<li><strong>Adjacent payment history:</strong> Have they paid for anything in this domain? (0–2)</li>
</ul>

<p>Max score: 8. Scheduling tool average: 6.1. Skill-exchange average: 2.7.</p>

<p>Not a scientific instrument. But a structured way to compare signals across conversations without letting enthusiasm cloud judgment.</p>

<h2>What 14 conversations can and can't tell you</h2>

<p>Fourteen conversations can tell you whether the problem is real and whether pain is high enough to motivate behavior change. They cannot tell you whether your specific solution is the right one, what features to prioritize, or what price will work. Those questions require different methods: prototype testing, landing page experiments, willingness-to-pay surveys.</p>

<p>But they can save you months of building the wrong thing. That's the point. Validate the problem before you validate the solution. Most founders do it in reverse — they build something, then try to find the market. The 14-conversation sprint is a forcing function to do it right.</p>
    `,
  },
  {
    id: 5,
    slug: "from-notebook-to-narrative-storytelling-with-data",
    title: "From notebook to narrative: storytelling with data",
    category: "Analytics",
    readTime: "9 min",
    description:
      "Why the last 10% of an analysis is what makes leaders act.",
    publishedDate: "Mar 5, 2025",
    fullContent: `
<p>The analysis was correct. The methodology was sound. The data was clean. The findings were, honestly, significant — the kind of insight that should have changed how the team prioritized its next quarter.</p>

<p>Nobody acted on it.</p>

<p>This happens constantly in data work, and it's one of the most demoralizing things for analysts who care about their craft. The problem almost never lives in the analysis. It lives in the communication. The last 10% — how you translate findings into narrative — is what determines whether your work drives action or disappears into a shared folder.</p>

<h2>The myth of "letting the data speak for itself"</h2>

<p>Data doesn't speak. Analysts speak. Charts don't communicate — they display. The narrative, the framing, the sequence, the emphasis: those are all choices made by a human, and they determine whether the audience understands, cares, and acts.</p>

<p>"Letting the data speak for itself" is often a form of abdication. It usually produces a wall of charts with no clear takeaway, a long appendix of tables that nobody reads, and a presentation where the most important finding is buried on slide 17. The audience — who didn't do the analysis and doesn't know the data as well as you do — is left to draw their own conclusions. They usually draw the wrong ones, or none at all.</p>

<p>Your job is to make the insight unavoidable. That requires choices.</p>

<h2>Start with the recommendation, not the analysis</h2>

<p>Most data presentations follow a logical sequence: here's the question, here's the data we looked at, here's what we found, here's what it means. That's the order of how you did the work. It's almost never the right order for communicating it.</p>

<p>Decision-makers are time-constrained and context-rich. They have strong priors about the business. They don't need to see the methodology before the finding — they need to know what you're recommending and why, so they can decide whether to engage with the evidence.</p>

<p>The Pyramid Principle, formalized by Barbara Minto, makes this explicit: start with the conclusion, then support it with arguments, then support each argument with evidence. Inverted from how analysis happens. Aligned with how busy, senior people actually receive information.</p>

<p>Try this structure: "We recommend [X]. Here's why: [three reasons]. Here's the evidence for each: [data]. Here's the countervailing evidence and why we discounted it: [alternative views]. Here's what we're asking you to decide: [specific question]."</p>

<p>Uncomfortable at first. Transformatively effective once you practice it.</p>

<h2>The one-slide test</h2>

<p>Every analysis I complete now gets a one-slide summary before anything else. One slide: the main finding, the key supporting evidence, and the recommended action. If I can't fit those three things on one clear slide, my thinking isn't clear enough yet. The slide forces me to answer the hardest question: what is this analysis actually saying?</p>

<p>The detailed appendix — methodology, data sources, additional cuts, sensitivity analysis — stays. It's important for credibility and for follow-up questions. But it goes behind the one-slide summary. The audience can choose to go deeper. They shouldn't have to in order to get the point.</p>

<h2>Choose the right chart for the relationship</h2>

<p>Chart selection is often arbitrary — analysts default to bar charts for everything, or use whatever their BI tool makes easiest. But chart type encodes a relationship, and choosing the wrong one obscures the pattern you're trying to show.</p>

<p>A short taxonomy of chart-to-relationship matching:</p>

<ul>
<li><strong>Comparison (A vs. B):</strong> Bar chart, dot plot, small multiples</li>
<li><strong>Change over time:</strong> Line chart (almost always; bar charts for discrete periods)</li>
<li><strong>Part-to-whole:</strong> Stacked bar (not pie charts — they're hard to read accurately)</li>
<li><strong>Distribution:</strong> Histogram, box plot, violin plot</li>
<li><strong>Correlation:</strong> Scatter plot with trend line</li>
<li><strong>Ranking:</strong> Sorted bar chart, slope chart for rank change over time</li>
</ul>

<p>The principle: choose the chart that makes the pattern in the data visible as quickly as possible. If the audience needs to study the chart for thirty seconds before understanding it, that's a chart failure.</p>

<h2>Annotation as narrative</h2>

<p>One of the most powerful and underused techniques: annotate your charts. Put the insight directly on the visualization, not in a caption below it. Add a callout that says "retention drops 18% at day 7" on the line at day 7. Add a label that says "anomaly: campaign ended" at the spike in August.</p>

<p>Annotation removes the gap between what the chart shows and what you want the audience to understand. It means the chart can stand alone — someone who wasn't in the room can look at it and understand the point. That matters more than you think, because most of your work gets forwarded, printed, and presented by people other than you.</p>

<h2>The narrative arc of a good analysis</h2>

<p>Think about a data presentation as a mini-documentary. It needs a hook (why does this matter?), a plot (here's what we found), a tension (here's what's surprising or uncomfortable about it), and a resolution (here's what you should do about it).</p>

<p>The tension is especially important. An analysis that only confirms what everyone already believed isn't very useful — and it won't get remembered. The most impactful analyses I've seen always contain a finding that challenges a prior assumption. "We assumed X, but the data shows Y." That moment of cognitive dissonance is what gets people to pay attention and change their behavior.</p>

<p>If your analysis doesn't have a tension — if it's all confirmation — ask yourself whether you looked hard enough. Usually the tension is there. It just requires a harder question or a less expected data cut to surface it.</p>

<h2>Quantify uncertainty honestly</h2>

<p>One of the trust-destroying habits in data communication: overclaiming certainty. "Customers in segment B are 34% more likely to churn" sounds precise, but if that's based on a 60-person sample with no statistical significance test, it's a hypothesis, not a finding. Presenting it as a finding is a form of misinformation, even if unintentional.</p>

<p>Communicate confidence levels. Distinguish between "we observed" and "we conclude." Say "this suggests" when the evidence is suggestive, not conclusive. Audiences can handle uncertainty — they're used to operating in uncertainty. What erodes trust is discovering later that you were more confident than the evidence warranted.</p>

<h2>The feedback loop that makes analysts better</h2>

<p>The most reliable path to better analytical communication: deliver an analysis, watch what decisions get made (or not made), and trace backward from the outcome to the communication. Did they miss the main finding? Did they understand the recommendation but not the stakes? Did they act on a secondary finding and ignore the primary?</p>

<p>That feedback loop is how narrative intuition develops. Most analysts skip it — they deliver the analysis and move on to the next project. The ones who stay in the room to see what happens, who follow up on decisions, who ask "did my work change anything?" — those are the ones who get faster at knowing how to make work land.</p>

<p>The analysis is the 90%. The narrative is the 10%. But the 10% is what makes the other 90% matter.</p>
    `,
  },
  {
    id: 6,
    slug: "a-students-roadmap-to-aws-fundamentals",
    title: "A student's roadmap to AWS fundamentals",
    category: "Technology",
    readTime: "6 min",
    description:
      "What to learn in what order — without drowning in services.",
    publishedDate: "Feb 18, 2025",
    fullContent: `
<p>AWS has over 200 services. The official documentation is enormous. The certification paths can take months. And if you start on the AWS console without a clear map, you will spend your first two weeks clicking through services that have nothing to do with what you actually need to learn first.</p>

<p>I made that mistake. This post is an attempt to save you from it: a sequenced, practical roadmap to AWS fundamentals aimed at students who want to build real things and understand the core concepts — not just pass a certification.</p>

<h2>The mental model before anything else</h2>

<p>Before you touch a single AWS service, build a mental model of what cloud computing is actually doing. Cloud infrastructure is rented computing resources — compute (run code), storage (save data), and networking (connect things) — provisioned on-demand and billed by usage. That's the whole idea. Everything else is variation on those three primitives.</p>

<p>AWS's job is to abstract away the physical infrastructure — the servers, the cables, the data center cooling — and give you an API to create, configure, and destroy these resources programmatically. The power isn't in the services individually. It's in the ability to compose them reliably at scale without managing the underlying hardware.</p>

<h2>Layer 1: Compute and the execution model</h2>

<p><strong>Start here: EC2 (Elastic Compute Cloud)</strong></p>

<p>EC2 is a virtual server. You choose an OS, a CPU/memory configuration (called an instance type), and you get a machine you can SSH into and run whatever you want. It's the closest analog to your laptop. Understanding EC2 gives you intuition for everything else — the concepts of regions, availability zones, security groups, and IAM roles all become concrete when you're managing an actual server.</p>

<p>Spend time on: launching an instance, SSHing in, setting up a simple web server (nginx or Apache), understanding security groups (these are firewalls — what ports are open to whom?), and stopping/terminating instances. Also: understand the pricing model. On-demand vs. reserved vs. spot instances is a concept that will recur throughout AWS.</p>

<p><strong>Then learn: Lambda</strong></p>

<p>Lambda is serverless compute — you upload a function, define what triggers it, and AWS handles the server entirely. No instance to manage. You pay only when the function runs. Lambda is appropriate for event-driven, short-duration tasks: processing an image upload, responding to an API request, reacting to a database change. It's not appropriate for long-running processes.</p>

<p>Understanding both EC2 and Lambda gives you the two ends of the compute spectrum. Most real architectures use a mix.</p>

<h2>Layer 2: Storage</h2>

<p><strong>S3 (Simple Storage Service)</strong></p>

<p>S3 is object storage. You store files (objects) in buckets. It's infinitely scalable, highly durable, and cheap. It's used for static website hosting, storing images and videos, data lake storage, backup, and distribution through CloudFront. Almost every AWS architecture touches S3.</p>

<p>Learn: creating buckets, uploading and downloading objects, bucket policies and ACLs (access control), static website hosting, versioning, and lifecycle rules (moving objects to cheaper storage tiers over time).</p>

<p><strong>RDS (Relational Database Service)</strong></p>

<p>RDS is managed relational databases — you pick your engine (PostgreSQL, MySQL, Aurora, etc.) and AWS handles backups, patching, failover, and scaling. You connect to it like any database; the difference is you don't manage the server it runs on.</p>

<p>Understanding when to use RDS vs. when to stand up your own database on EC2 vs. when to use DynamoDB (NoSQL) is a key architectural decision skill. The short answer: RDS for most relational workloads where you want managed operations; DynamoDB for high-throughput, key-value workloads where you need single-digit millisecond latency at scale.</p>

<h2>Layer 3: Networking</h2>

<p><strong>VPC (Virtual Private Cloud)</strong></p>

<p>VPC is how you isolate your resources in AWS. By default, things you create are in a default VPC, but real architectures use custom VPCs to control exactly which resources can talk to which others, what's exposed to the internet, and what's kept private.</p>

<p>Concepts to understand: subnets (public vs. private), internet gateways, NAT gateways, route tables, security groups, and network ACLs. This section is often where students get lost — it requires thinking in network topology, which is unfamiliar. My recommendation: draw the architecture. Literally draw the VPC, the subnets, and the arrows showing what can talk to what. Networking is visual.</p>

<h2>Layer 4: Identity and access</h2>

<p><strong>IAM (Identity and Access Management)</strong></p>

<p>IAM is how AWS controls who can do what. Users, groups, roles, and policies. This is not optional — it's foundational to everything secure in AWS. The principle of least privilege (give each entity only the permissions it needs, nothing more) is the core idea. Get comfortable reading and writing IAM policies in JSON. Understand the difference between a user (a person), a role (an identity assumed by a service or a person temporarily), and a policy (a document that grants or denies permissions).</p>

<p>A common pattern: an EC2 instance assumes an IAM role that grants it permission to read from S3. The instance doesn't have credentials hardcoded — it assumes the role, gets temporary credentials, and uses them. This is the right way to do it. Hardcoding AWS credentials is a mistake you make exactly once.</p>

<h2>The learning path I'd recommend</h2>

<ol>
<li><strong>Week 1–2:</strong> EC2, S3, IAM. Build: a static website hosted on S3. Then: deploy a simple web server on EC2, accessible from the internet.</li>
<li><strong>Week 3–4:</strong> RDS, Lambda, API Gateway. Build: a Lambda function behind an API Gateway endpoint that reads from RDS. This is the serverless API pattern.</li>
<li><strong>Week 5–6:</strong> VPC, CloudFront, Route 53. Build: move your EC2 app into a proper VPC with private subnets, add CloudFront in front of S3, set up a custom domain.</li>
<li><strong>Week 7–8:</strong> CloudWatch, cost management, and the AWS Well-Architected Framework. Build: instrument your existing apps with CloudWatch metrics and alarms. Review your architecture against the five pillars of the Well-Architected Framework.</li>
</ol>

<h2>What to ignore for now</h2>

<p>At least 150 of the 200+ AWS services are not relevant to you as a beginner. Ignore ECS, EKS, Step Functions, Glue, Kinesis, SageMaker, and the entire suite of ML/AI services until you have the fundamentals solid. Those are specializations. They make no sense without the core.</p>

<p>The goal in the first two months: feel comfortable building a full-stack application on AWS — a database, a backend API, some compute, and storage. If you can do that and explain how the pieces connect, you're genuinely ahead of most people who claim to "know AWS."</p>

<p>The certifications are a useful forcing function — the AWS Cloud Practitioner and Solutions Architect Associate are both reasonable for students — but don't mistake passing the certification for understanding the platform. Build things. Break things. Read the bills. That's how it actually sticks.</p>
    `,
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogData.find((b) => b.slug === slug);
}

export function getAdjacentBlogs(
  slug: string
): { prev: Blog | null; next: Blog | null } {
  const idx = blogData.findIndex((b) => b.slug === slug);
  return {
    prev: idx > 0 ? blogData[idx - 1] : null,
    next: idx < blogData.length - 1 ? blogData[idx + 1] : null,
  };
}
