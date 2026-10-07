# Persona AI Learning Log

## M0 — Understand the existing portfolio

### What we did

- Inspected the complete repository structure and configuration.
- Traced the root layout, public routes, section composition, navigation, styling, animations, and external contact-form request.
- Located every current source of portfolio knowledge.
- Identified the client/server boundary and selected future integration points without adding feature code.

### Concepts introduced

- **App Router:** folders and special files inside `app/` define routes, layouts, metadata, and server endpoints.
- **Server component:** the default component type in the App Router. It runs on the server and cannot use browser-only state or effects.
- **Client component:** a file marked with `"use client"`. It can use state, effects, event handlers, and browser APIs.
- **Route Handler:** an application-owned HTTP endpoint implemented in a `route.ts` file, such as the future `app/api/persona/route.ts`.
- **Global layout:** `app/layout.tsx` wraps every route, making it the correct future mounting point for a site-wide assistant.
- **Single source of truth:** one verified data record should power both the visible portfolio and the assistant so facts cannot drift.
- **Secret boundary:** browser bundles are public. The future OpenAI key must exist only in server-side code and environment configuration.

### Architectural decisions

- Preserve the current root-level directory convention.
- Add the chat globally through the root layout when M1 begins.
- Build chat UI behavior before adding an API or model.
- Introduce the first owned server endpoint in a separate milestone.
- Delay centralizing portfolio facts until the dedicated knowledge milestone, but do not create another long-term copy in the meantime.
- Keep the future Persona AI package out of the portfolio implementation until real reuse boundaries emerge.

### Problems and uncertainties discovered

- Projects, skills, certificates, contact details, and profile facts are currently embedded in UI components.
- “Full-Stack Systems Architect” and “Junior Fullstack Engineer” are both used; this needs an intentional identity decision before the assistant treats either as grounded truth.
- The planned Kuraz/experience questions have no corresponding dataset in the current repository.
- Existing lint issues predate Persona AI and should be tracked separately from milestone changes.

### Questions to answer before or during the knowledge milestones

1. What professional title should the assistant use by default?
2. Which employment and internship facts are approved for public answers?
3. Should blog posts become assistant knowledge, or remain outside the initial knowledge scope?
4. Which claims and metrics in the project cards are verified and suitable for grounded answers?

### M0 knowledge check

Before M1, I should be able to explain:

1. Why will the chat UI be a client component?
2. Why is the root layout the right place to mount a site-wide chat?
3. Why must an OpenAI API key never be placed in a client component?
4. What is the difference between a page component and a Route Handler?
5. Why should the website and assistant eventually read the same portfolio data?

## M1 — Local chat interface

### What we built

- Added a floating chat trigger that appears on every portfolio route.
- Added an accessible chat panel with a header, message list, composer, and close controls.
- Added local user-message submission and a clearly labeled temporary assistant reply.
- Matched the existing purple, glass-panel visual language and responsive layout.
- Kept the entire milestone local: no API route, AI SDK, API key, or network request.

### Files changed

- `components/persona/PersonaChat.tsx`: owns the chat interface, local state, and form behavior.
- `app/layout.tsx`: renders the chat once at the global application level.
- `docs/persona-ai/learning-log.md`: records this milestone and its learning checkpoint.

### The local interaction lifecycle

```text
Visitor opens chat
  ↓ onClick updates isOpen
React renders the panel
  ↓ onChange updates input for every keystroke
Visitor submits the form
  ↓ preventDefault stops browser navigation
  ↓ trim rejects an empty message
  ↓ setMessages appends user and demo assistant messages
  ↓ setInput clears the composer
React renders the updated conversation
```

### Concepts introduced

- **Component state:** `useState` stores information that changes while the visitor uses the interface.
- **Controlled input:** React state is the source of truth for the textarea value.
- **Event handler:** functions respond to clicks, typing, and form submission.
- **Immutable state update:** a new message array is created instead of mutating the existing array.
- **Conditional rendering:** the panel exists in the rendered output only while `isOpen` is true.
- **Form semantics:** a form supports expected browser and keyboard submission behavior.
- **Client boundary:** `PersonaChat` needs `"use client"`, while the root layout remains a server component that renders it.
- **Accessibility state:** labels, `aria-expanded`, `aria-controls`, and an `aria-live` message region communicate behavior to assistive technology.

### State owned by PersonaChat

| State | Type | Responsibility |
| --- | --- | --- |
| `isOpen` | `boolean` | Whether the panel is visible |
| `input` | `string` | Current textarea value |
| `messages` | `ChatMessage[]` | Visible local conversation |

The `ChatMessage` type limits `role` to `"assistant" | "user"`. This lets TypeScript reject unsupported roles and lets the UI style the two roles predictably.

### Why the demo reply is intentionally simple

The local reply proves that message state and rendering work without mixing in HTTP, server behavior, provider configuration, streaming, or model failures. The next milestone can replace this local behavior with a server boundary while keeping the visible interface understandable.

### Validation performed

- ESLint passed for the new component and changed layout.
- TypeScript passed with `npx tsc --noEmit`.
- The Next.js production build completed successfully.
- `git diff --check` found no whitespace errors.

### M1 knowledge check

Before adding a server endpoint, I should be able to explain:

1. What information does each of the three state variables store?
2. What makes the textarea a controlled input?
3. Why does `handleSubmit` call `event.preventDefault()`?
4. Why does `setMessages` create a new array instead of using `messages.push()`?
5. What does conditional rendering do when `isOpen` changes?
6. Why can a server component render `PersonaChat` even though `PersonaChat` is a client component?
7. Why did we avoid connecting OpenAI in the same milestone as the first chat UI?

## M2 — Browser-to-server chat request

### What we built

- Added the first application-owned endpoint at `POST /api/persona`.
- Defined a small JSON request and response contract.
- Validated malformed, missing, empty, and oversized messages on the server.
- Replaced the immediate local reply with an asynchronous `fetch()` request.
- Added a pending state, disabled composer state, and visible error feedback.
- Kept OpenAI and the AI SDK out of this milestone so the endpoint remains deterministic.

### Files changed

- `app/api/persona/route.ts`: parses and validates untrusted JSON, then returns a temporary JSON response.
- `components/persona/PersonaChat.tsx`: sends the request and manages success, pending, and failure states.
- `docs/persona-ai/learning-log.md`: records the M2 concepts and checkpoint.

### Request contract

```text
POST /api/persona
Content-Type: application/json

Request
{ "message": "What has Binyam built?" }

Successful response (HTTP 200)
{ "message": "Temporary server response..." }

Invalid request (HTTP 400)
{ "error": "Explanation of the invalid input" }
```

### Request lifecycle

```text
PersonaChat
  ↓ JSON.stringify converts a JavaScript object to JSON text
fetch("/api/persona", { method: "POST", ... })
  ↓ browser sends an HTTP request
POST Route Handler
  ↓ request.json() parses the JSON
  ↓ server validates type, whitespace, and length
Response.json(...)
  ↓ server sends an HTTP status and JSON body
fetch resolves to a Response
  ↓ response.json() parses the response body
PersonaChat
  ↓ appends a message or displays an error
```

### Concepts introduced

- **HTTP endpoint:** a URL plus an HTTP method that provides a server capability.
- **Request contract:** the agreed shape of data exchanged by client and server.
- **Serialization:** `JSON.stringify()` converts a JavaScript value into JSON text for transport.
- **Parsing:** `request.json()` and `response.json()` convert JSON text back into JavaScript values.
- **Status code:** `200` means success; `400` means the client sent an invalid request.
- **Trust boundary:** values received over HTTP are `unknown` until the server validates them.
- **Type guard:** `isPersonaRequest` performs runtime checks and tells TypeScript what a valid value contains.
- **Asynchronous operation:** `await` pauses the handler function while the network operation completes without freezing the interface.
- **Loading state:** `isSubmitting` prevents duplicate submissions and gives the visitor feedback.
- **Error handling:** `try/catch/finally` separates success, failure, and cleanup behavior.

### Why client and server both limit the message

The textarea's `maxLength` improves the visitor experience, but browser controls can be bypassed by calling the endpoint directly. The Route Handler therefore repeats the important validation. Client validation is convenience; server validation is enforcement.

### TypeScript lesson from implementation

The response type declares `message` as optional because an error response may not contain it. After runtime validation, the code assigns it to `responseMessage`. This preserves the fact that the value is definitely a string when it enters the later state-update callback.

### Validation performed

- Focused ESLint passed.
- TypeScript passed with `npx tsc --noEmit`.
- The production build passed and lists `/api/persona` as a dynamic route.
- The remaining verification is a manual browser request test.

### M2 knowledge check

Before connecting the Vercel AI SDK, I should be able to explain:

1. What exact JSON does the browser send to `/api/persona`?
2. What is the difference between `JSON.stringify()` and `.json()`?
3. Why does the Route Handler treat the parsed body as `unknown`?
4. Why is server validation still required when the textarea has `maxLength`?
5. What does `response.ok` tell the client?
6. What jobs do `try`, `catch`, and `finally` perform?
7. Why is `isSubmitting` separate from `messages` and `input`?
8. What will change—and what can stay the same—when the temporary response is replaced by OpenAI?

## M3 — OpenAI streaming through Vercel AI SDK

### What we built

- Installed `ai`, `@ai-sdk/react`, and `@ai-sdk/openai`.
- Added a safe, committable `.env.example` and kept `.env.local` ignored.
- Replaced the temporary JSON response with `streamText()` using the OpenAI provider.
- Replaced hand-written client request/message state with the AI SDK `useChat()` hook.
- Added a `DefaultChatTransport` pointing to `/api/persona`.
- Sent full conversation history to the server and converted UI messages into model messages.
- Returned the model result using the AI SDK UI-message streaming protocol.
- Preserved server validation and added conversation-count and system-message restrictions.

### Dependency responsibilities

| Package | Environment | Responsibility |
| --- | --- | --- |
| `ai` | Server and shared types | generation, message conversion, validation, streaming protocol |
| `@ai-sdk/react` | Browser | chat state, sending, stream consumption, progressive rendering |
| `@ai-sdk/openai` | Server | converts the AI SDK model call into an authenticated OpenAI request |

The AI SDK does not provide the intelligence. OpenAI provides the model; the AI SDK provides integration abstractions.

### Streamed request lifecycle

```text
Visitor submits text
  ↓ useChat appends a UIMessage
DefaultChatTransport
  ↓ POSTs the conversation to /api/persona
Route Handler
  ↓ validates unknown UI messages
  ↓ rejects client-supplied system messages
  ↓ converts UIMessage[] to ModelMessage[]
streamText + OpenAI provider
  ↓ reads OPENAI_API_KEY only on the server
OpenAI model
  ↓ produces incremental stream events
toUIMessageStream + createUIMessageStreamResponse
  ↓ sends the AI SDK SSE protocol over HTTP
useChat
  ↓ merges incoming text parts into the assistant UIMessage
React
  ↓ re-renders progressively while status is "streaming"
```

### Concepts introduced

- **Provider:** the adapter that knows how to authenticate and communicate with a model service such as OpenAI.
- **Model:** the selected OpenAI system that produces the response.
- **System instruction:** trusted server-side instructions that define assistant behavior and are separate from visitor messages.
- **Conversation history:** prior user and assistant messages sent with the new question so the model can understand follow-ups.
- **UI message:** an AI SDK message designed for rendering; its `parts` can eventually contain text, sources, files, reasoning, or tool information.
- **Model message:** the simpler representation sent to the language model after UI-only information is removed.
- **Transport:** the client object that knows which endpoint receives messages and how to consume its response protocol.
- **Streaming:** sending partial response events as they are generated instead of waiting for one complete JSON response.
- **SSE:** Server-Sent Events, the text framing used by the AI SDK UI-message stream over the HTTP response.
- **Status machine:** `submitted`, `streaming`, `ready`, and `error` describe the current request phase.

### Secret boundary

`.env.local` will contain:

```text
OPENAI_API_KEY=real_secret_value
PERSONA_AI_MODEL=gpt-5.6-luna
```

Only the Route Handler reads these variables. The browser receives streamed output, never the key. A variable prefixed with `NEXT_PUBLIC_` would be exposed to browser code and must not be used for this secret.

### Why messages use parts now

Our earlier custom messages contained one `text` property. AI SDK UI messages use a `parts` array because future responses may combine multiple kinds of content. For M3, the renderer intentionally displays only `text` parts. Sources, tools, and rich cards remain later milestones.

### Why the system instruction is still minimal

M3 verifies provider connectivity and streaming, not portfolio knowledge. The current instruction tells the model not to invent Binyam facts and to disclose that verified knowledge is not connected. The detailed Binyam context belongs to M4.

### Validation performed

- Focused ESLint passed.
- Strict TypeScript passed.
- Production build passed.
- A request without `OPENAI_API_KEY` returned an intentional HTTP 503 response.
- A real streamed OpenAI response still requires a local key and browser smoke test.

### Dependency audit note

`npm audit` reported high-severity advisories in the existing Next.js dependency chain. The suggested automatic fix upgrades Next.js outside the current declared version, so it was not applied as an unrelated, potentially breaking change during M3. It should be handled as a separate maintenance task.

### M3 knowledge check

Before adding Binyam's temporary hardcoded context, I should be able to explain:

1. What separate job does each of the three new packages perform?
2. Why does `useChat` use a transport?
3. What is the difference between a `UIMessage` and a model message?
4. Why is the system instruction created on the server rather than accepted from the browser?
5. What do the `submitted`, `streaming`, `ready`, and `error` statuses mean?
6. What changes on screen while stream chunks arrive?
7. Why must `.env.local` remain uncommitted, and why is `.env.example` safe to commit?
8. What information is sent as conversation history, and why does the model need it?
9. Which Persona AI responsibilities are not handled by the Vercel AI SDK?
