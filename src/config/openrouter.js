// OpenRouter API Configuration
const OPENROUTER_API_KEY = "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"; 
const OPENROUTER_MODEL = "openai/gpt-3.5-turbo"; // or use "meta-llama/llama-2-70b-chat" or other models
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are an AI healthcare assistant for students. dont answer anything which is not related to health or medical. 

Provide:
• possible reasons for symptoms
• basic precautions
• when to see a doctor

Rules:
- No medical diagnosis
- Keep response between 100-120 words
- Dont answer anything which is not related to health or medical
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important  na
- Make the response visually organized and easy to read`;

async function runChat(userInput, systemPrompt = SYSTEM_PROMPT, sessionHistory = []) {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error(
        "OpenRouter API key missing. Add REACT_APP_OPENROUTER_API_KEY to your .env file and restart the dev server."
      );
    }

    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      ...(sessionHistory || []),
      {
        role: "user",
        content: userInput
      }
    ];

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter API Error ${response.status}: ${response.statusText}` +
          (response.status === 401 ? " - Unauthorized. Check REACT_APP_OPENROUTER_API_KEY." : "") +
          (errorText ? ` Response body: ${errorText}` : "")
      );
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    aiResponse = aiResponse
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .split('\n•').join('<br/>•');

    return aiResponse;
  } catch (error) {
    console.error("Error in runChat:", error);
    throw error;
  }
}

export default runChat;
