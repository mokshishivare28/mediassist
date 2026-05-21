import { createContext, useState } from "react";
import runChat from "../config/openrouter";

export const Context = createContext();

const MEDICAL_SYSTEM_PROMPT = `You are an AI medical health assistant for students. ONLY answer queries related to physical health, medical conditions, symptoms, and medical advice.

REJECT and DO NOT answer:
- Physical health symptoms (use Medical Consultation instead)
- Medical conditions and diseases
- Physical disease treatment
- Medication advice
- Diagnoses of physical illnesses
- Do not answer any query which is not realted  to health and medical advice and tell the logger to ask a medical query
- Do not answer for any query asking for any recipe or process to make any dish

For valid mental wellness queries, provide:
• emotional support and understanding
• coping strategies and techniques
• wellness tips and mindfulness practices
• when to seek professional help
• resources and support services

Rules:
- No medical diagnosis or physical health advice
- Keep response between 100-120 words
- If query is physical health/medical related, politely decline and suggest Medical Consultation
- Be empathetic and supportive
- FORMAT YOUR RESPONSE WITH PROPER LINE BREAKS AND STRUCTURE
- Use newlines (\n) to separate different sections
- Use bullet points with • for lists
- Use bold with ** for important terms
- Make the response visually organized and easy to read`;


const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const formatResponse = (response) => {
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        return newResponse.split("*").join("</br>");
    }

    const onSent = async (prompt) => {
        const promptText = (prompt || input).trim();
        if (!promptText) return;

        setInput("");
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(promptText);
        setMessages(prev=>[...prev, {role: 'user', content: promptText}]);

        try {
            const response = await runChat(promptText, MEDICAL_SYSTEM_PROMPT, messages);
            const formatted = formatResponse(response);
            setResultData(formatted);
            setMessages(prev=>[...prev, {role: 'assistant', content: formatted}]);
        } catch (error) {
            const errorText = `Error: ${error.message}`;
            setResultData(errorText);
            setMessages(prev=>[...prev, {role:'assistant', content:errorText}]);
        } finally {
            setLoading(false);
        }
    }

    const resetChat = () => {
        setInput("");
        setRecentPrompt("");
        setShowResult(false);
        setLoading(false);
        setResultData("");
        setMessages([]);
        setPrevPrompts([]);
    }

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
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider