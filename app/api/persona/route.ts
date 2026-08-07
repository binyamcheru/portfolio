import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  streamText,
  toUIMessageStream,
} from "ai";

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
    system: `You are Binyam AI, an early portfolio-assistant prototype.
Be concise and conversational.
The verified portfolio knowledge has not been connected yet, so do not invent facts about Binyam.
If asked for facts about Binyam, explain that the knowledge layer will be added in the next milestone.`,
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
