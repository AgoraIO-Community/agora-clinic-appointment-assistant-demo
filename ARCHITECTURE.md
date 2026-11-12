# Clinic Appointment Assistant Architecture

## Components

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

## Session time limit

LandingPage enforces a ten-minute browser session deadline from successful startup. It reuses the manual stop flow, checks wall time every second and on focus/visibility changes, and retries failed stops every five seconds. Successful stop retains the transcript and shows a timeout notice; starting again resets the deadline. Effect cleanup removes the timer/listeners. This is not a server-side usage cap: closed pages, suspended devices and network failures can delay Agent shutdown.

The conversation header shows a small, muted countdown (10:00 left) immediately before the connection status. The last minute is highlighted, with an automatic-stop notice for screen readers. At the deadline the timer stays at 00:00 until stopping succeeds. Screen readers do not announce every tick.

## Start and stop

The page requests an RTC/RTM token and starts the managed Agent using requester_id and channel_name. RTM is ready before the RTC conversation component mounts. End conversation stops the Agent, logs out RTM and unmounts hook-owned media. No customer, shopping, follow-up or event session participates in startup.

## State

Scenario instructions and static public reference material are bundled with the app. Current-call transcript, activity and Inspector state live in browser memory. There is no business Map, writable result file, business API or application database.

## Ownership and invariants

LandingPage owns bootstrap and RTM. ConversationComponent owns RTC/toolkit subscriptions and uses the StrictMode guard. Preserve local-user UID normalization and interrupted turns. Token, invite and stop routes own privileged operations. lib/agent-tools.ts always returns an empty list.

## Deployment

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

Supply NEXT_PUBLIC_AGORA_APP_ID at build and runtime and keep NEXT_AGORA_APP_CERTIFICATE server-only. No persistent volume is required. Synthetic verification does not prove real speech or hosted reachability.

## Usage FAQ ownership

`components/ScenarioFaq.tsx` owns static usage answers; `styles/faq.css` owns disclosure styling, scrolling and transitions. Its header trigger and content share a Radix Dialog root in `LandingPage`. Dialog handles focus trapping, Escape/backdrop dismissal and returning focus to the trigger. FAQ has no session or business API calls.

## Conversation behavior

### What the assistant helps with

Provide useful clinic reception guidance without pretending to access a schedule. Answer hours, location, access, specialties and visit-preparation questions from the reference before asking for more details.

If the caller describes a possible immediate medical emergency, prioritize brief guidance to call 911 or the local emergency number now. Stop routine intake and scheduling questions; do not wait for a name, identity check or a tool response, and do not imply you have contacted emergency services.

For routine needs, clarify whether the visit is for an adult or child and what the caller wants help arranging, using their own words. Explain the configured family medicine, internal medicine and pediatric roles at a general reception level; do not diagnose a symptom or decide clinical urgency beyond immediate emergency guidance.

Ask only the next useful preference, such as a date, morning versus afternoon or a preferred listed doctor. Use the local calendar to clarify ambiguous dates. Describe opening hours as office hours, never as appointment vacancies or a statement that a particular doctor is accepting a patient.

Offer practical preparation: the caller can prepare a brief reason for the visit, questions, medication list and relevant documents for the clinic. Explain that these are for the actual visit; do not ask the caller to read private records, full birth date or identifiers into this conversation.

For an existing appointment, help organize what the caller wants changed and what to verify with the clinic. For prescriptions, tests or billing, identify the appropriate clinic question rather than interpreting results or inventing a charge. Give a concise recap of preferences and what the clinic still needs to confirm.

### Reference material and date context

Configured scenario reference, explicitly separate from live business records.

`lib/scenario-knowledge.ts` supplies the public material. `lib/prompt-context.ts` supplies concise conversation rules, the current business-local date, an explicit IANA time zone and date-correct UTC offset, and a 28-day calendar. Dates in that calendar are not availability. Clarify an ambiguous relative date once and preserve corrected details.

### Capability boundary

Agora Family Clinic and its listed clinicians are fictional configured examples. No patients, clinical records, availability or appointment system are connected. Do not verify identity, request full date of birth, diagnose, prescribe, interpret tests, quote a bill, book, reschedule or cancel a visit. Do not claim a nurse, doctor or emergency service has been contacted, an escalation saved or a live transfer performed. Opening hours do not establish an available slot.

## Token lifetime compatibility

Browser RTC/RTM tokens and server-side Agent/REST tokens use the shared ten-minute `TOKEN_LIFETIME_SECONDS` duration. Token builders take durations, not Unix expiry timestamps. Keep the App Certificate and ConvoAI-capable REST tokens on the server.

The Agent start/stop routes explicitly mint tokens with `ConvoAITokenBuilder.buildToken` and pass the supported SDK `authToken` / session `token` options. This avoids the `agora-agents` 2.14.0 / `agora-token` 2.0.7 positional-argument mismatch: the SDK helper otherwise treats publisher role `1` as a one-second token lifetime. Do not patch installed dependencies or add blanket overrides. `verify:api` exercises the real SDK serialization with intercepted network transport, decodes and verifies actual signed tokens, and checks a 600-second lifetime for browser, REST start, Agent RTC/RTM and REST stop tokens. Revisit the explicit-token compatibility path only after an upstream SDK correction passes this regression and live acceptance.

## Lint dependency security compatibility

The registry audit reports GHSA-g3hv-75wg-m249 in minimatch 10.2.6, including the latest typescript-estree 8.72.2 dependency range. A parent-scoped pnpm override selects minimatch 11.0.1 only for `@typescript-eslint/typescript-estree>minimatch`; it does not replace unrelated consumers. Node.js 24 satisfies its runtime requirement, and the caller uses the retained CommonJS `minimatch` function with `dot: true`. Recheck and remove this compatibility override when the upstream dependency range includes a patched version. Run the complete verification suite and an official-registry audit after lockfile updates.
