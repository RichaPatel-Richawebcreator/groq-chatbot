export const validateMessage = (message) => {
    if (!message || typeof message !== 'string') {
        return { valid: false, error: 'Message must be a string' };
    }

    const trimmed = message.trim();

    if (trimmed.length === 0) {
        return { valid: false, error: 'Message cannot be empty' };
    }

    if (trimmed.length > 4000) {
        return { valid: false, error: 'Message is too long (max 4000 characters)' };
    }

    return { valid: true, value: trimmed };
};

export const validateConfig = (config) => {
    const errors = [];

    if (!config.API_KEY) {
        errors.push('API key is required');
    }

    if (!config.API_URL) {
        errors.push('API URL is required');
    }

    if (!config.MODEL) {
        errors.push('Model is required');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};