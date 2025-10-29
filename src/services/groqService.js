import { GROQ_CONFIG, MESSAGES_CONFIG } from "../constants/config";

const sendMessageToGroq = async (messages, onChunk, onComplete, onError) => {
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
                stream: true,
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        onComplete();
                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const content = json.choices[0]?.delta?.content;
                        if (content) {
                            onChunk(content);
                        }
                    } catch {
                        // Skip invalid JSON
                    }
                }
            }
        }

        onComplete();
    } catch (error) {
        onError(error.message || MESSAGES_CONFIG.ERROR.GENERIC);
    }
};
export default sendMessageToGroq;