import { GROQ_CONFIG } from "../constants/config";
import { handleApiError } from "./errorHandler";

const sendMessageToGroq = async (messages) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GROQ_CONFIG.REQUEST_TIMEOUT);

    try {
        const response = await fetch(GROQ_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_CONFIG.API_KEY}`,
            },
            body: JSON.stringify({
                model: GROQ_CONFIG.MODEL,
                messages,
                temperature: GROQ_CONFIG.TEMPERATURE,
                max_tokens: GROQ_CONFIG.MAX_TOKENS,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(errorData.error?.message || 'API request failed');
            error.response = { status: response.status, data: errorData };
            throw error;
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0]?.message?.content) {
            throw new Error('Invalid response format from API');
        }

        return {
            content: data.choices[0].message.content,
            usage: data.usage,
            model: data.model,
        };
    } catch (error) {
        clearTimeout(timeoutId);
        throw handleApiError(error);
    }
};
export default sendMessageToGroq;