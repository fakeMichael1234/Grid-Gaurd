---
name: civic-ui-standards
description: Apply these standards whenever building or editing UI for Grid Guard, or any civic/government/infrastructure software module (citizen portals, admin dashboards, incident management, public-sector tools). Make sure to use this skill any time the user asks to build a module, page, component, or feature for a government, utility, or civic-facing product, even if they don't explicitly ask for "design standards" or "UI rules." Covers no-emoji policy, professional visual tone, design system discipline, avoiding AI-generated placeholder content, and token-efficient build behavior.
---

# Civic UI Standards

Standards for building professional, production-grade UI for civic and infrastructure software (e.g. Grid Guard). Apply automatically — do not wait to be reminded.

## Before writing any code

Read every SKILL.md available (frontend-design, and any docx/pptx/xlsx skills if the task touches document output), plus any existing templates, design tokens, or component libraries already in the project folder. Reuse what exists instead of inventing a new pattern. Do not skip this step, and do not narrate that you're doing it — just do it.

## Visual tone

- No emojis anywhere: not in UI copy, icons, code comments, commit messages, or documentation. Use proper icon components (e.g. lucide-react) instead of emoji glyphs.
- This is civic infrastructure software, not a consumer or startup product. Think: municipal services portal, utility company dashboard, emergency services interface — not a landing page or app-store app.
- No visible "AI-generated" tells: no Lorem ipsum, no generic "Welcome!" hero banners, no filler copy. Every string should read like a product team wrote it for this exact product and its exact users.
- Calm, authoritative, high-trust tone. Avoid exclamation points, cutesy microcopy, or marketing language. Urgency (e.g. emergency reporting flows) should be conveyed through clear visual hierarchy and color, not alarmist language.

## Design system discipline

- Define a real color palette, spacing scale, and type scale before building screens, and use them consistently. No ad hoc inline colors or one-off spacing values.
- Reuse the same component patterns across a module (buttons, form fields, status badges, cards) rather than reinventing per screen.
- Responsive and accessible by default: proper label associations, sufficient contrast, visible focus states, keyboard navigation.
- Status and severity indicators (e.g. incident priority, complaint status) should use a consistent, distinguishable visual language throughout the product — establish it once, reuse everywhere.

## Code quality

- No dead code, no commented-out scaffolding, no speculative abstractions for features outside current scope.
- Sensible, real-world file and folder organization — structure it the way an engineering team would, not the way a demo would.
- Handle error and empty states, not just the happy path.

## Communication style while building

- Be token-efficient. Do not restate the brief back to the user, do not narrate step-by-step process, do not over-explain.
- Flag genuinely ambiguous requirements briefly rather than guessing silently on something structurally important — but don't ask about things a reasonable product decision can resolve.
- End with a short, concrete summary: what was built, what stack/libraries were used, what's fully functional vs stubbed. No preamble, no repetition of the request.
