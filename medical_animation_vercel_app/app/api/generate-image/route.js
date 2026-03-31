
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "prompt is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
    });

    const b64 = result?.data?.[0]?.b64_json;
    if (!b64) {
      return Response.json({ error: "No image returned" }, { status: 500 });
    }

    return Response.json({
      imageUrl: `data:image/png;base64,${b64}`,
    });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Image generation failed" },
      { status: 500 }
    );
  }
}
