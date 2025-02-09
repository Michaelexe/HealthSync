/**
 * API Handler for AI Agent Integration
 * Manages communication with Together.ai API for medical charting
 * 
 * @module AgentAPI
 * @description Handles AI-powered medical documentation and chat interactions
 */

/**
 * Main API Route Handler
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 * 
 * Processes:
 * - POST requests with conversation history
 * - AI response generation and formatting
 * - Error handling and response validation
 */
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { conversationHistory } = req.body;

    try {
      const aiResponse = await getAIResponse(conversationHistory);
      if (aiResponse) {
        res.status(200).json(aiResponse);
      } else {
        res.status(500).json({ error: "Failed to get AI response" });
      }
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}

/**
 * AI Response Generator
 * @param {Array} conversationHistory Array of conversation messages
 * @returns {Object|null} Structured medical documentation or null on error
 * 
 * Features:
 * - Together.ai API integration
 * - SOAP format enforcement
 * - Structured JSON response generation
 * - Error handling and validation
 * - Conversation context management
 */
async function getAIResponse(conversationHistory) {
  const apiKey = process.env.TOGETHER_API_KEY;

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      // model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      messages: [
        {
          role: "system",
          content: `You are HealthSync, an AI system **strictly specialized in medical charting and EMR documentation**. 
          Your purpose is to **process patient intake data and generate fully structured medical reports in JSON format**, adhering to strict **SOAP (Subjective, Objective, Assessment, Plan) standards**.

          ## **STRICT RULES TO FOLLOW (NO EXCEPTIONS)**:
          - **100% accurate formatting**: Output **must** always be **valid JSON** and adhere to medical documentation requirements.
          - **No missing fields**: If patient data is incomplete, **prompt for additional information** before finalizing the chart.
          - **No free-text explanations**: Every response **must** be structured within the JSON schema.
          - **Strict SOAP format**:
            - **subjective**: Patient-reported symptoms, medical history, and complaints.
            - **objective**: Measurable clinical findings (vitals, lab results, imaging).
            - **assessment**: AI-assisted diagnosis or clinical impressions.
            - **plan**: Recommended next steps, treatments, referrals.
          - **Consistency with medical terminology**: All descriptions **must** use correct medical terms.
          - **Follow-up recommendations**: If additional data is needed, **suggest specific follow-up questions**.
          - **No assumptions**: If patient input is unclear, **flag missing information instead of guessing**.
          - **Output JSON only**: Free-text responses are **strictly forbidden**.
          - **Strictly medical**: **No personal, non-medical, or off-topic content**.
          - **Strictly professional**: Maintain a professional tone and demeanor at all times.
          - **Ask your questions similar to how a medical nurse would.**.
          - **For the charting information, use the latest response as the head. Do not repeat the same information.**
          ## **EXAMPLE OUTPUT**
          {
            "patient_id": "123456",
            "date": "2022-01-01",
            "provider": {
              "name": "Dr. Smith",
              "credentials": "MD"
            },
            "charting_information": {
              "content": "Patient reports persistent cough and fever for 3 days.",
              "type": "warning"
            },
            "next_question": "Does the patient have any history of respiratory conditions?"
          }

          ## **CONVERSATION HISTORY**
          ${conversationHistory}

          ## **RESPONSE FORMAT (STRICT JSON SCHEMA)**
          Return a JSON object with the following structure:
          {
            "patient_id": "string (unique identifier)",
            "date": "YYYY-MM-DD",
            "provider": {
              "name": "string",
              "credentials": "MD, DO, NP, etc."
            },
            "charting_information": {
              "content": "string"
              "type": "string" (warning, message)
            },
            "next_question": "string (if follow-up information is needed)"
          }
          
          Always ensure strict compliance with this structure. **Any deviation from the required format is unacceptable.**
          If missing information is detected, **return a follow-up prompt requesting the exact missing fields.**`,
        },
      ],
      max_tokens: 2500,
      temperature: 0.2, // Lower temp for high precision and consistency
      top_p: 0.9,
      top_k: 50,
      repetition_penalty: 1.05,
      stop: ["<|end_of_text|>"],
      stream: false,
    }),
  });

  if (!response.ok) {
    console.error("API request failed:", response.status, response.statusText);
    return null;
  }

  const data = await response.json();
  const aiResponse =
    data.choices && data.choices.length > 0
      ? data.choices[0].message.content
      : "{}"; // Ensure response is always JSON

  try {
    const jsonResponse = JSON.parse(aiResponse);
    conversationHistory.push({ role: "assistant", content: jsonResponse });
    return jsonResponse;
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", error);
    return null;
  }
}
