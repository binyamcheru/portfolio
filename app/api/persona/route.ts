import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  streamText,
  toUIMessageStream,
} from "ai";
import { buildPersonaContext } from "@/lib/persona/knowledge";

const MAX_MESSAGE_LENGTH = 1_000;
const MAX_CONVERSATION_MESSAGES = 20;
const DEFAULT_MODEL = "gemini-3.5-flash-lite";

function getStreamErrorMessage(error: unknown) {
  console.error("Persona stream error", error);

  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return `Gemini request failed: ${error.message}`;
  }

  return "The assistant could not generate a response.";
}

function getText(message: {
  parts: Array<{ type: string; text?: string }>;
}) {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } =>
        part.type === "text" && typeof part.text === "string",
    )
    .map((part) => part.text)
    .join("");
}

export async function POST(request: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "The Gemini API key is not configured on the server." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "The request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || !("messages" in body)) {
    return Response.json(
      { error: "The request must include a messages array." },
      { status: 400 },
    );
  }

  const validation = await safeValidateUIMessages({
    messages: body.messages,
  });

  if (!validation.success) {
    return Response.json(
      { error: "The conversation contains invalid messages." },
      { status: 400 },
    );
  }

  const messages = validation.data;

  if (messages.length === 0 || messages.length > MAX_CONVERSATION_MESSAGES) {
    return Response.json(
      {
        error: `The conversation must contain between 1 and ${MAX_CONVERSATION_MESSAGES} messages.`,
      },
      { status: 400 },
    );
  }

  if (messages.some((message) => message.role === "system")) {
    return Response.json(
      { error: "System messages cannot be supplied by the client." },
      { status: 400 },
    );
  }

  const latestUserMessage = messages.findLast(
    (message) => message.role === "user",
  );
  const latestUserText = latestUserMessage ? getText(latestUserMessage) : "";

  if (!latestUserText.trim()) {
    return Response.json(
      { error: "The conversation must include a user text message." },
      { status: 400 },
    );
  }

  if (latestUserText.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `The message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  const result = streamText({
    model: google(process.env.PERSONA_AI_MODEL || DEFAULT_MODEL),
    system: `You are "Ask Binyam", the assistant on Binyam Cheru Debebe's portfolio site.

Answer questions about Binyam using only the verified portfolio knowledge supplied below.
Write in a plain, friendly, professional voice. Keep answers short (one to three sentences unless a list is clearly needed). Refer to Binyam in the third person.
Formatting: plain text with optional simple bullet lists ("- item") and **bold** for names. No headings, tables, or nested lists.
If the knowledge does not contain the answer, say so plainly and suggest contacting Binyam directly.
Never invent or infer jobs, dates, skills, education, achievements, metrics, or contact details.
Do not claim that a target, projected reach, or platform capacity has already been achieved.
When a visitor asks how to contact Binyam, provide the relevant contact details from the knowledge.

VERIFIED PORTFOLIO KNOWLEDGE:
${buildPersonaContext()}`,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onError: getStreamErrorMessage,
    }),
  });
}
