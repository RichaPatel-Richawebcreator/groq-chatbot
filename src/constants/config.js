export const GROQ_CONFIG = {
    API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    MODEL: 'llama-3.3-70b-versatile',
    API_KEY: import.meta.env.VITE_GROQ_API_KEY || '',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
    REQUEST_TIMEOUT: 30000,
};

export const MESSAGES_CONFIG = {
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        NETWORK: 'Network error. Please check your connection.',
        API_KEY: 'Invalid API key. Please check your configuration.',
        TIMEOUT: 'Request timed out. Please try again.',
        RATE_LIMIT: 'Rate limit exceeded. Please wait a moment.',
    },
    WELCOME: {
        TITLE: 'Start a conversation',
        SUBTITLE: "Ask me anything! I'm powered by Groq's ultra-fast AI.",
    },
    INPUT_PLACEHOLDER: 'Type your message...',
    LOADING: 'AI is thinking...',
};

export const UI_CONFIG = {
    MAX_MESSAGE_LENGTH: 4000,
    SCROLL_BEHAVIOR: 'smooth',
    TOAST_DURATION: 3000,
};