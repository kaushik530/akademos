I want you to refine and complete the Akademos frontend.

FIRST, USE THESE DESIGN SKILLS:

npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines

npx skills add https://github.com/leonxlnx/taste-skill --skill minimalist-ui

Read and follow both skills before making UI decisions.

============================================================
CORE REQUIREMENT
============================================================

Build Akademos as a cohesive, production-quality adaptive learning
application.

The final result must NOT look AI-generated, vibe-coded, template-generated,
or like a generic Tailwind/shadcn SaaS dashboard.

It should feel like a deliberately designed educational product.

The existing Akademos visual language is the source of truth.

DO NOT throw away the existing visual identity and replace it with another
design system.

The current design already establishes:

- dark black
- coffee brown
- taupe
- cream
- warm paper backgrounds
- restrained borders
- DM Sans
- DM Mono
- Playfair Display for selected editorial emphasis
- square / restrained corner treatment
- strong typography
- thin dividers
- compact navigation
- editorial spacing
- data-oriented layouts

Preserve and refine this language.

============================================================

1. # ABSOLUTELY NO "VIBE-CODED" VISUAL LANGUAGE

Recognize common AI-generated website patterns and actively avoid them.

Do NOT produce:

LAYOUT

- giant hero sections with little information
- excessive empty space pretending to be premium
- every section vertically centered
- every section using heading + subtitle + cards + button
- arbitrary 12-column grids
- excessive nested containers
- cards inside cards inside cards
- unrelated dashboard widgets
- pages that feel like independent templates
- excessive sidebar navigation
- vague marketing navigation labels

AI STARTUP AESTHETIC

- purple/blue AI gradients
- neon purple/cyan
- glowing borders
- gradient text
- mesh gradients
- blurred gradient blobs
- floating translucent objects
- excessive backdrop blur
- glassmorphism
- neon shadows
- glowing buttons
- animated gradient backgrounds
- AI sparkles
- decorative AI particles

CARDS

- everything becoming a card
- huge border radii
- giant card padding with little information
- identical cards repeated everywhere
- decorative icons inside every card
- unnecessary shadows
- fake clickable cards
- cards styled like buttons
- title + icon + description + arrow repeated mechanically
- meaningless statistic cards

TYPOGRAPHY

- enormous 72px+ headings where unnecessary
- excessive bold text
- excessive font weights
- uppercase everywhere
- tiny gray text everywhere
- poor contrast
- giant gradient headings
- generic typography with no hierarchy
- centered text when left alignment is better
- excessive letter spacing

COPY
NEVER use generic AI/SaaS phrases such as:

"Unlock your potential"
"Supercharge your learning"
"Transform your journey"
"The future of learning is here"
"Powered by cutting-edge AI"
"Revolutionize your workflow"
"Take your learning to the next level"
"One platform. Infinite possibilities."
"Built for the future"
"Experience the power of AI"

Use functional product language instead.

Examples:

"Continue learning"
"Knowledge gaps"
"Today's plan"
"Why this concept?"
"Roadmap updated"
"3 concepts need review"

Never invent testimonials, user counts, success rates, AI accuracy,
performance claims, or other fake product statistics.

# ============================================================ 2. NO AI DECORATION

Akademos uses AI internally.

The UI should NOT constantly advertise that fact.

Do NOT add:

- "AI-powered" badges everywhere
- sparkle icons
- magic wand icons
- AI labels on ordinary functionality
- chatbot bubbles everywhere
- "Ask AI" buttons on every screen
- fake AI thinking animations
- fake analysis animations
- fake progress percentages
- artificial "AI processing" timers

AI should be represented through actual product behavior:

resource extraction
concept extraction
knowledge graph generation
assessment generation
mastery estimation
roadmap adaptation

The interface should communicate the result of intelligence rather than
decorate the UI with AI symbolism.

# ============================================================ 3. NO DASHBOARD TEMPLATE

Do not create the typical:

[stat] [stat] [stat] [stat]

followed by:

[chart] [chart]

followed by:

[activity] [calendar]

The dashboard must answer one question:

"What should the learner do next?"

The primary hierarchy should be:

1. Current learning action
2. Today's plan
3. Knowledge gaps
4. Roadmap state
5. Recent adaptation
6. Supporting progress information

Use charts only when they communicate something useful.

# ============================================================ 4. PRESERVE EXISTING AKademos DESIGN

The existing frontend already contains:

- landing experience
- application shell
- sidebar
- topbar
- dashboard
- roadmap
- knowledge graph
- progress
- resources
- learning page
- onboarding
- assessment

Preserve these structures where appropriate.

Do not create an entirely new component system.

Reuse existing components and styles.

Do not duplicate components with slightly different styles.

One concept should have one visual language across the application.

# ============================================================ 5. LOGO INTRO

On the first visit:

Show:

Akademos logo

- Akademos title

The logo and title should animate into view subtly.

Use:

- opacity
- small scale
- subtle translation

Do NOT use:

- particles
- glowing effects
- giant zoom
- spinning logos
- gradient animations
- loading-spinner appearance

The intro should be brief.

Then transition into onboarding.

For returning users, make the intro shorter or skippable.

Do not force the full intro every visit.

# ============================================================ 6. ONBOARDING

Do NOT use one giant form.

Use one meaningful student decision at a time.

Sequence:

01 — What do you want to learn?

02 — What is your goal?

03 — What level do you want?

04 — How much time do you have?

05 — Do you have learning material?

06 — Review

Use a restrained progress indicator.

The transition between steps should be subtle.

The onboarding should feel like a guided product setup, not a survey.

# ============================================================ 7. STUDENT INPUTS

SUBJECT

"What do you want to learn?"

Support:

- suggested subjects
- custom subject

GOAL

"What are you trying to achieve?"

Options:

- Pass an exam
- Pass an interview
- Build a project
- Become job-ready
- Gain academic proficiency
- Other

TARGET PROFICIENCY

1 — Fundamentals
2 — Application
3 — Proficiency
4 — Project Ready
5 — Advanced

TIME

Ask:

How long do you want to take?

And:

How much time can you realistically study?

The available study time is a real constraint for roadmap scheduling.

LEARNING MATERIAL

Allow:

- PDF
- notes
- lecture slides
- books
- documents

Also:

"I don't have material"

The student must never be blocked because they don't have resources.

# ============================================================ 8. ONBOARDING INTERACTION QUALITY

Selection states must be obvious.

Inputs need real labels.

Do not rely on placeholder text as labels.

Validation must be visible.

Buttons should communicate hierarchy.

Do not make every button a large filled CTA.

Support:

Saving
Saved
Uploading
Uploaded
Processing
Failed
Retry

Do not use fake progress.

# ============================================================ 9. FINAL REVIEW

Before assessment show a concise summary:

Subject
Goal
Target
Duration
Available study time
Learning material

Actions:

Edit
Start Assessment

Avoid decorative summary cards.

Use typography, alignment, and dividers to structure information.

# ============================================================ 10. DIAGNOSTIC ASSESSMENT

After onboarding:

"Let's see what you already know."

Show one question at a time.

Display:

question number
progress
answer state
optional confidence

Keep the assessment focused.

Do not turn it into a generic quiz template.

# ============================================================ 11. ASSESSMENT RESULT

Show concept-level mastery.

Example:

SQL Basics 85%
ER Model 72%
Transactions 65%
Functional Dependencies 48%
Normalization 31%

Clearly communicate:

strong areas
partial understanding
knowledge gaps

Do not pretend these values are real unless returned by the backend.

# ============================================================ 12. KNOWLEDGE ANALYSIS

After assessment, transition into a meaningful processing state.

Example:

BUILDING YOUR LEARNING MAP

✓ Assessment complete
✓ Concepts identified
✓ Prerequisites analyzed
● Building learning path

Only display actual quantities if the backend supplies them.

Never fake AI processing with a 5-second animation.

# ============================================================ 13. KNOWLEDGE GRAPH

Use the existing React Flow implementation.

The graph should communicate:

- concepts
- prerequisites
- relationships
- mastery
- knowledge gaps
- current concept
- completed concepts

Do NOT make it a decorative constellation.

The graph should answer:

"What do I know?"
"What am I missing?"
"What depends on what?"

# ============================================================ 14. CONCEPT DETAIL

Clicking a graph node should reveal useful information.

Example:

NORMALIZATION

Mastery
68%

Difficulty
Intermediate

Estimated time
45 min

Prerequisites

Functional Dependencies
Relational Model

Related concepts

1NF
2NF
3NF
BCNF

History

3 attempts
Last assessed today

Actions:

Start Learning
Take Assessment

Prefer a side panel/drawer where appropriate instead of constantly opening
large modal dialogs.

# ============================================================ 15. "WHY THIS?"

Whenever Akademos recommends a concept, explain why.

Example:

WHY THIS CONCEPT?

Your mastery of Functional Dependencies is currently 48%.

It is a prerequisite for:

Functional Dependencies
↓
Normalization
↓
BCNF

Akademos placed this earlier because improving it unlocks later concepts.

This explanation is more important than decorative UI.

# ============================================================ 16. ROADMAP

Roadmap should show:

Completed
Current
Upcoming
Needs review
Blocked by prerequisite

Example:

FOUNDATIONS

✓ Relational Model
✓ ER Model

CURRENT

→ Functional Dependencies

UP NEXT

→ Normalization

LATER

→ Transactions

The roadmap should communicate dependency and reasoning.

It should not look like a generic project-management timeline.

# ============================================================ 17. "WHAT CHANGED?"

After assessment, if the roadmap changes, explicitly communicate it.

Example:

ROADMAP UPDATED

Functional Dependencies
48% → 72%

Normalization moved earlier.

Reason:

Your latest assessment identified a prerequisite gap.

Only display changes actually calculated by the backend.

# ============================================================ 18. "WHAT'S NEXT?"

At every important point, give the student one clear next action.

Examples:

Continue Functional Dependencies

Take Quick Check

Review Normalization

Complete today's assessment

Do not give five competing primary CTAs.

# ============================================================ 19. MAIN DASHBOARD

After onboarding and diagnostic assessment, enter the persistent dashboard.

Navigation:

Dashboard
Roadmap
Learn
Knowledge Graph
Assessments
Progress
Resources

Keep navigation concise.

Do not add navigation items just because common SaaS dashboards have them.

# ============================================================ 20. DASHBOARD HIERARCHY

Top:

CURRENT LEARNING

Normalization

42% complete

[Continue]

Then:

TODAY

Functional Dependencies
35 min

Normalization
25 min

Quick Check
5 min

Then:

KNOWLEDGE GAPS

Normalization
31%

Functional Dependencies
48%

Then:

ROADMAP

Show only the immediately relevant portion.

Then:

RECENT CHANGES

Only show meaningful events.

Supporting analytics can appear below.

# ============================================================ 21. RETURNING USER

Returning users should not repeat onboarding.

Show:

CONTINUE LEARNING

Normalization
42% complete

[Continue]

The product should remember the learner's state.

# ============================================================ 22. LEARNING EXPERIENCE

The learning page should be a serious study environment.

Display:

Concept
Mastery
Difficulty
Estimated time
Prerequisites

Content:

Explanation
Examples
Worked example
Practice
Resources

End:

Test your understanding

Avoid excessive UI around the actual learning material.

The content should be the dominant element.

# ============================================================ 23. FOCUS MODE

Provide optional distraction-free learning.

Hide:

unnecessary navigation
secondary metrics
irrelevant actions

Keep:

content
progress
previous
next
assessment

Do not redesign focus mode as a completely different product.

# ============================================================ 24. MICRO-ASSESSMENTS

Support:

Diagnostic Assessment
Concept Assessment
Quick Check
Review Assessment

Example:

QUICK CHECK

3 questions
~3 minutes

[Start]

# ============================================================ 25. CONFIDENCE

Where useful, collect:

Not sure
Somewhat sure
Very sure

Do not ask for confidence after every interaction if it creates friction.

# ============================================================ 26. ADAPTIVE LOOP

The frontend must communicate this actual product loop:

ASSESS
↓
LEARN
↓
TEST
↓
UPDATE MASTERY
↓
UPDATE KNOWLEDGE GRAPH
↓
DETECT GAPS
↓
RECALCULATE PRIORITIES
↓
UPDATE ROADMAP
↓
CONTINUE

This is the heart of Akademos.

# ============================================================ 27. DAILY PLAN

Translate the long-term roadmap into an actionable daily plan.

Example:

TODAY

Functional Dependencies
35 min

Normalization
25 min

Quick Check
5 min

Total:
65 min / 60 min target

If the schedule exceeds available time, communicate the conflict.

Do not silently pretend everything fits.

# ============================================================ 28. STUDY TIME

Optionally show:

Today's study

42 / 60 min

Current session

18:42

Do not make timers visually dominant.

# ============================================================ 29. RESOURCE SYSTEM

Resources should be related to concepts.

Example:

DBMS Lecture 04.pdf

Related concepts:

Functional Dependencies
Normalization
Candidate Keys

Concept page:

Learning resources

DBMS Lecture 04.pdf
Pages 17–24

This relationship should eventually come from the backend/knowledge graph.

# ============================================================ 30. RESOURCE STATES

Support:

Upload
Uploading
Processing
Processed
Failed
Retry

Do not fabricate extraction statistics.

# ============================================================ 31. PROGRESS

Show useful analytics only:

Overall mastery
Concept mastery
Study time
Assessment performance
Completed concepts
Knowledge gaps
Recent changes

Avoid:

- chart spam
- meaningless donuts
- decorative graphs
- 3D charts
- rainbow visualizations

Every visualization must answer a question.

# ============================================================ 32. ACTIVITY

Use real activity.

Example:

TODAY

✓ Completed assessment
↻ Roadmap updated
↑ Mastery increased

Do not populate the activity feed with fabricated events.

# ============================================================ 33. EMPTY STATES

Design proper empty states.

No resources:

"You haven't added learning material yet."

[Add resources]

No assessment history:

"Complete your first assessment to start building your mastery profile."

No knowledge graph:

"Your knowledge graph will appear after your initial assessment."

No roadmap:

"Complete the diagnostic assessment to generate your learning path."

Never leave a page looking unfinished.

# ============================================================ 34. ERROR STATES

Design proper error states for:

AI unavailable
Roadmap generation failed
Upload failed
Assessment submission failed
Network failure

Communicate:

What happened
Whether progress was saved
What can be done

Actions:

Retry
Back
Continue later

Never expose stack traces.

# ============================================================ 35. LOADING STATES

Every data-driven page needs an intentional loading state.

Do not use generic spinning loaders everywhere.

Prefer:

- skeletons where appropriate
- progressive content
- concise status indicators

For long AI operations, show meaningful stages only when they correspond
to actual backend states.

# ============================================================ 36. AUTOSAVE / RECOVERY

Where appropriate:

Onboarding
Assessment
Learning session

Support:

Saving...
Saved

Preserve progress if the user refreshes or returns later.

# ============================================================ 37. SEARCH

When there is enough content, support global search.

Search:

Concepts
Resources
Roadmap items
Learning material

Do not add search just to imitate a SaaS product.

# ============================================================ 38. SETTINGS

Keep settings restrained.

Include:

Profile
Learning preferences
Goal
Study availability
Theme
Learning data management

If study availability changes, allow schedule recalculation.

# ============================================================ 39. RESPONSIVE DESIGN

Do NOT simply shrink desktop.

Design intentionally for:

Desktop
Laptop
Tablet
Mobile

Mobile requirements:

- usable navigation
- readable typography
- sufficient touch targets
- no horizontal overflow
- usable assessment
- usable graph
- no microscopic buttons
- no hover-dependent interactions

# ============================================================ 40. ACCESSIBILITY

Follow the web design guidelines.

Include:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- sufficient contrast
- reduced-motion support
- screen-reader-friendly status changes
- appropriate button semantics

Do not remove focus outlines just for aesthetics.

# ============================================================ 41. RESPONSIBLE ANIMATION

Animation exists to communicate:

- navigation
- state change
- selection
- progress
- transition

The only intentionally prominent animation should be the initial Akademos
identity sequence.

Avoid:

- infinite animations
- floating cards
- particles
- animated gradients
- excessive parallax
- bouncing elements
- random movement
- hover scaling everywhere
- unnecessary page transitions

Respect prefers-reduced-motion.

# ============================================================ 42. BUTTON HIERARCHY

Create a clear hierarchy:

Primary
Secondary
Tertiary
Destructive

Not every button should be filled.

Not every button should contain an icon.

Not every action should look like a CTA.

Use text-only actions where appropriate.

# ============================================================ 43. ICONS

Use one coherent icon set.

Existing Lucide icons may be used where useful.

Do not:

- add icons to every label
- use icons as decoration
- mix icon styles
- use sparkles for AI
- use giant icons to fill empty cards

# ============================================================ 44. TYPOGRAPHY

Use the existing typography system.

DM Sans:
Primary interface/body typography.

DM Mono:
Metadata, labels, technical values, small status information.

Playfair Display:
Selective editorial emphasis only.

Do not overuse the serif font.

Typography should create hierarchy without relying on enormous font sizes.

# ============================================================ 45. COLOR

Preserve the established Akademos palette.

Do not introduce:

purple
electric blue
cyan
neon green
pink gradients
rainbow accents

unless required for a meaningful semantic state.

Color should communicate:

mastery
warning
error
current state
selection

and not simply decorate.

# ============================================================ 46. SHAPE LANGUAGE

The existing application uses restrained rectangular components.

Preserve that.

Avoid:

- huge pill buttons
- giant rounded cards
- circular everything
- excessive border radius

Use shape intentionally.

# ============================================================ 47. SHADOWS

Use shadows sparingly.

Prefer:

borders
contrast
spacing
surface changes

over large soft shadows.

Do not use generic SaaS floating-card shadows everywhere.

# ============================================================ 48. INFORMATION ARCHITECTURE

The interface should prioritize information over decoration.

The learner should always understand:

1. Where am I?
2. What am I learning?
3. Why am I learning this?
4. How well do I know it?
5. What should I do next?
6. What changed after my latest assessment?

If the interface cannot answer these, improve the hierarchy.

# ============================================================ 49. TECHNICAL ARCHITECTURE

Keep:

React
TypeScript
Vite

Do NOT convert to Next.js.

Use the existing:

React Router
React Flow
Recharts
TanStack Query
Zustand
React Hook Form
Zod
Lucide

where appropriate.

Frontend:

React
↓
FastAPI
↓
PostgreSQL
Neo4j
AI services

Never connect React directly to Neo4j.

Never expose AI API keys.

Never expose database credentials.

# ============================================================ 50. API-READY FRONTEND

Do not hardcode backend logic into UI components.

Create a proper API layer.

Functions should include concepts such as:

getDashboard()
getRoadmap()
getKnowledgeGraph()
getConcept()
getProgress()
getResources()

startAssessment()
getAssessment()
submitAssessment()

generateLearningPlan()

updateMastery()

getDailyPlan()

uploadResource()

processResource()

The exact implementation should follow the existing backend API.

# ============================================================ 51. MOCK DATA RULE

If backend functionality is not implemented yet:

keep mock data behind the API/data layer.

Do NOT scatter:

const fakeData = ...

throughout React components.

When the real API is connected, components should not need to be rewritten.

Never present demo data as real user data.

# ============================================================ 52. NO PROTOTYPE-THAT-ACCIDENTALLY-SHIPPED LOOK

Remove:

Lorem ipsum
John Doe
Example User
fake avatars
fake notifications
fake dates
fake analytics
fake activity
dead buttons
dead links
"Coming soon" everywhere
debug text
browser alerts
broken images
console errors
unhandled API errors
infinite loading
empty routes

No API keys in frontend.

No hardcoded API URLs scattered across components.

No mock data mixed directly into presentation components.

# ============================================================ 53. COMPONENT CONSISTENCY

Use a small, coherent design system.

Do not create slightly different versions of:

buttons
cards
inputs
badges
progress bars
headers
navigation
empty states
loading states

If an existing component can be reused, reuse it.

New components must visually belong to the existing system.

# ============================================================ 54. PAGE CONSISTENCY

Every page should feel like Akademos.

The:

Dashboard
Roadmap
Learning
Knowledge Graph
Assessment
Progress
Resources
Onboarding

must share:

typography
spacing
colors
borders
interaction patterns
button hierarchy
status language

Do not allow each page to become its own mini-template.

# ============================================================ 55. FINAL EXPERIENCE

FIRST VISIT:

Akademos logo
↓
Akademos title
↓
brief identity animation
↓
Subject
↓
Goal
↓
Target proficiency
↓
Available time
↓
Learning material
↓
Review
↓
Diagnostic assessment
↓
Knowledge analysis
↓
Knowledge graph
↓
Personalized roadmap
↓
Dashboard

RETURNING USER:

Short intro
↓
Dashboard
↓
Continue where you left off

LEARNING LOOP:

Dashboard
↓
Today's plan
↓
Learn
↓
Quick check
↓
Assessment
↓
Mastery update
↓
Knowledge graph update
↓
Roadmap adaptation
↓
"What changed?"
↓
"What's next?"
↓
Continue

# ============================================================ 56. FINAL ANTI-VIBE-CODE REVIEW

Before considering the implementation complete, inspect the ENTIRE
application as a single product.

Check every page.

Ask:

Does this look like an AI-generated SaaS template?

If yes:
remove the generic elements.

Are there too many cards?

Remove unnecessary ones.

Are there unnecessary gradients?

Remove them.

Is there excessive border radius?

Reduce it.

Is there excessive blur?

Remove it.

Are there unnecessary icons?

Remove them.

Is there unnecessary animation?

Remove it.

Is there generic marketing copy?

Replace it with functional language.

Are there fake statistics?

Remove them.

Are there fake AI processing states?

Remove them.

Are there competing primary actions?

Establish a clear hierarchy.

Does every page have loading, empty and error states?

Implement them.

Does the roadmap explain WHY?

Implement it.

Does the UI explain WHAT CHANGED?

Implement it.

Does the dashboard clearly show WHAT'S NEXT?

Make it the primary hierarchy.

Does the knowledge graph actually help the learner?

Make node interactions useful.

Does the learning page prioritize learning content?

If not, remove UI clutter.

Does mobile feel intentionally designed?

Fix it.

Do components look like they belong to different websites?

Unify them.

Does any part look like it was copied from a generic AI website generator?

Remove it.

# ============================================================ 57. FINAL DESIGN STANDARD

The goal is NOT:

"Make this website look impressive."

The goal is:

"Make this product feel inevitable, coherent, useful, and deliberately
designed."

The visual system should support the learning system.

The strongest visual elements should be:

- learner mastery
- knowledge dependencies
- current learning state
- roadmap decisions
- adaptive changes
- actual learning content

NOT:

- gradients
- glowing effects
- AI sparkles
- decorative blobs
- excessive cards
- meaningless charts
- marketing slogans

The final result should look like a serious educational product that a
human product/design team intentionally designed and iterated on.

It should NOT look like a collection of AI-generated components.
