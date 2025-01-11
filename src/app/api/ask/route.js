import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load your API key from environment variables
});

export async function POST(request) {
  try {
    const { question } = await request.json(); // Parse the request body

    // Use the chat completion endpoint
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      max_tokens: 200,
    });

    return new Response(
      JSON.stringify({ answer: completion.choices[0].message.content.trim() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({ error: "Error generating response", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
