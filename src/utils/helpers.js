/**
 * Smooth scroll to element
 */
export const scrollToBottom = (ref) => {
    if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
};

/**
 * Format timestamp
 */
export const formatTimestamp = (date = new Date()) => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * Generate unique ID
 */
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

export const validateMessage = (message) => {
    const trimmed = message.trim();
    if (trimmed.length === 0) return { valid: false };
    if (trimmed.length > 4000) return { valid: false };
    return { valid: true, value: trimmed };
};