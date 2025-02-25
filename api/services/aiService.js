import fetch from "node-fetch";

const url = "https://api.forefront.ai/v1/chat/completions";
const api_key = process.env.FOREFRONT_API_KEY;

export const generateTaskSuggestion = async (prompt) => {
  // Create a more detailed prompt that requests a step-by-step breakdown
  const enhancedPrompt = `Create a step-by-step guide for the following task: "${prompt}". 
  Format your response as a numbered list with 3-7 concrete steps. Each step should be clear, actionable, and specific.`;

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${api_key}`,
    },
    body: JSON.stringify({
      model: "alpindale/Mistral-7B-v0.2-hf",
      messages: [
        {
          role: "user",
          content: enhancedPrompt,
        },
      ],
      max_tokens: 256, 
      temperature: 0.5,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Failed to fetch AI suggestion" };
    }


    return {
      choices: [
        {
          message: {
            content:
              data.choices[0]?.message?.content || "No suggestion available",
          },
        },
      ],
    };
  } catch (error) {
    console.error("AI request failed:", error);
    return { error: "AI request failed" };
  }
};
