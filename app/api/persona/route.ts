const MAX_MESSAGE_LENGTH = 1_000;

type PersonaRequest = {
  message: string;
};

function isPersonaRequest(value: unknown): value is PersonaRequest {
  if (typeof value !== "object" || value === null) return false;

  const request = value as Record<string, unknown>;
  return typeof request.message === "string";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "The request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!isPersonaRequest(body)) {
    return Response.json(
      { error: "The request must include a message string." },
      { status: 400 },
    );
  }

  const message = body.message.trim();

  if (!message) {
    return Response.json(
      { error: "The message cannot be empty." },
      { status: 400 },
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `The message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  return Response.json({
    message:
      "Your message reached the Persona API route successfully. This is still a temporary server response; OpenAI is not connected yet.",
  });
}
