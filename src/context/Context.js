import { createContext, useState } from "react";
import runChat from "../config/openrouter";

export const Context = createContext();

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

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }


    const onSent = async (prompt) => {
        setInput("")
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await runChat(input, MEDICAL_SYSTEM_PROMPT)
        let responseArray = response.split("**");
        let newResponse="";
        for(let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
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