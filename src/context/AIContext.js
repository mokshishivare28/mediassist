import { createContext, useState } from "react";
import runChat from "../config/openrouter";

export const AIContext = createContext();

const MEDICAL_SYSTEM_PROMPT = `You are an AI medical health assistant for students. ONLY answer queries related to physical health, medical conditions, symptoms, and medical advice.

REJECT and DO NOT answer:
- Mental health issues (use Mind-Bot instead)
- Psychological problems (anxiety, depression, stress)
- Emotional support requests
- Wellness coaching unrelated to physical health
- Personal life advice

For valid medical queries, provide:
• possible reasons for symptoms
• basic precautions
• when to see a doctor

Rules:
- No medical diagnosis
- Keep response between 100-120 words
- If query is not medical/physical health related, politely decline and suggest Mind-Bot
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important terms
- Make the response visually organized and easy to read`;

const AIContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const formatResponse = (response) => {
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    return newResponse.split("*").join("</br>");
  };

  const onSent = async (prompt) => {
    const promptText = (prompt || input).trim();
    if (!promptText) return;

    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(promptText);
    setMessages(prev=>[...prev, {role:'user', content: promptText}]);

    try {
      const response = await runChat(promptText, MEDICAL_SYSTEM_PROMPT, messages);
      const formatted = formatResponse(response);
      setResultData(formatted);
      setMessages(prev=>[...prev, {role:'assistant', content: formatted}]);
    } catch (error) {
      const errorText = `Error: ${error.message}`;
      setResultData(errorText);
      setMessages(prev=>[...prev, {role:'assistant', content:errorText}]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setInput("");
    setRecentPrompt("");
    setShowResult(false);
    setLoading(false);
    setResultData("");
    setMessages([]);
    setPrevPrompts([]);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    messages,
    resetChat,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <AIContext.Provider value={contextValue}>
      {props.children}
    </AIContext.Provider>
  );
};

export default AIContextProvider;
