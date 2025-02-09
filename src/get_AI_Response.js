// @sunnypatell

/**
 * Asynchronously handles patient input, manages conversation history, and interacts with the Together AI API
 * to collect patient data through a conversational interface. Once sufficient data is gathered, it returns
 * a structured JSON object containing the patient's information.
 *
 * @param {string} userInput - The latest input from the patient.
 * @param {Array} userHistory - The cumulative history of the conversation, including both user and assistant messages.
 * @returns {Object|null} - Returns a structured JSON object with patient data or null if an error occurs.
 */
async function getAIResponse(userInput, userHistory) {
    // Ensure the API key is stored securely and accessed from environment variables
    const apiKey = process.env.TOGETHER_API_KEY; // As per Together AI documentation, set TOGETHER_API_KEY in your environment variables

    // Validate the presence of the API key
    if (!apiKey) {
        console.error("API key is missing. Please set the TOGETHER_API_KEY environment variable.");
        return null;
    }

    // Define the system message outlining the AI's role and strict operational guidelines
    const systemMessage = {
        role: "system",
        content: `You are HealthSync, an AI medical assistant designed to pre-screen patients before their doctor or nurse visits.

        STRICT OPERATION RULES (NO EXCEPTIONS):
        - Engage in a back-and-forth conversation with the patient to gather all necessary medical details.
        - Store all collected responses dynamically in JSON format for later retrieval.
        - DO NOT assume missing details—ask the patient for clarification instead.
        - If conflicting information is provided, ask follow-up questions to resolve inconsistencies.
        - Only finalize the report when all essential information is collected.
        - Output strict JSON in a standardized format at the end of the conversation.

        CONVERSATION FLOW:
        1. Symptoms & Complaints: Ask about current symptoms, duration, and severity.
        2. Lifestyle & Habits: Inquire about smoking, drinking, exercise, diet.
        3. Medical History: Collect past illnesses, surgeries, medications, allergies.
        4. Family History: Ask about hereditary conditions (diabetes, heart disease, etc.).
        5. Demographics: Collect age, sex, height, weight.
        6. Additional Risk Factors: Travel history, occupational risks, recent exposures.
        7. Finalize Data Collection: If sufficient information is gathered, return the structured JSON report.

        STRICT JSON OUTPUT FORMAT:
        When all data is collected, return a JSON object:
        {
            "patient_id": "string (unique identifier)",
            "date": "YYYY-MM-DD",
            "demographics": {
                "age": "integer",
                "sex": "string",
                "height": "string (e.g., '5ft 10in')",
                "weight": "string (e.g., '165 lbs')"
            },
            "medical_history": {
                "past_conditions": ["string"],
                "surgeries": ["string"],
                "medications": ["string"],
                "allergies": ["string"]
            },
            "family_history": {
                "conditions": ["string"]
            },
            "lifestyle": {
                "smoking": "yes/no",
                "alcohol_consumption": "yes/no",
                "exercise_frequency": "string"
            },
            "current_symptoms": {
                "symptoms": ["string"],
                "duration": "string",
                "severity": "string"
            },
            "risk_factors": {
                "travel_history": "string",
                "occupational_exposures": "string",
                "recent_contact_with_sick": "yes/no"
            },
            "summary": "string (brief structured summary for the doctor/nurse)"
        }

        If data collection is incomplete, DO NOT return JSON yet. Instead, continue asking necessary questions.`
    };

    // Construct the messages array for the API request, including the system message and conversation history
    const messages = [systemMessage, ...userHistory, { role: "user", content: userInput }];

    try {
        // Make the API request to Together AI's chat completion endpoint
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "together-ai/DeepSeek-R1-Distill-Llama-70B-free", // Ensure this model suits your application's needs
                messages: messages,
                max_tokens: 2500, // Adjust based on the model's token limitations
                temperature: 0.3, // Lower temperature for more deterministic responses
                top_p: 0.9,
                top_k: 50,
                repetition_penalty: 1.05,
                stop: ["<|end_of_text|>"],
                stream: false
            })
        });

        // Check if the response is successful
        if (!response.ok) {
            console.error("API request failed:", response.status, response.statusText);
            return null;
        }

        // Parse the JSON response from the API
        const data = await response.json();

        // Validate the structure of the API response
        if (!data.choices || data.choices.length === 0) {
            console.error("Invalid API response structure:", data);
            return null;
        }

        // Extract the AI's message content
        const aiMessage = data.choices[0].message.content;

        // Attempt to parse the AI's message as JSON
        try {
            const jsonResponse = JSON.parse(aiMessage);
            // Append the assistant's message to the conversation history
            userHistory.push({ role: "assistant", content: aiMessage });
            return jsonResponse;
        } catch (jsonError) {
            // If parsing fails, assume the conversation is ongoing
            userHistory.push({ role: "assistant", content: aiMessage });
            return null;
        }
    } catch (error) {
        // Log any errors that occur during the fetch or processing
        console.error("An error occurred during the API request:", error);
        return null;
    }
}
