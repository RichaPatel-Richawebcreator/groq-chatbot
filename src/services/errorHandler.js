import { MESSAGES_CONFIG } from '../constants/config';

export class AppError extends Error {
    constructor(message, type = 'GENERIC', originalError = null) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.originalError = originalError;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * Handle API errors
 */
export const handleApiError = (error) => {
    console.error('API Error:', error);

    // Network errors
    if (!navigator.onLine) {
        return new AppError(
            MESSAGES_CONFIG.ERROR.NETWORK,
            'NETWORK',
            error
        );
    }

    // Timeout errors
    if (error.name === 'AbortError') {
        return new AppError(
            MESSAGES_CONFIG.ERROR.TIMEOUT,
            'TIMEOUT',
            error
        );
    }

    // HTTP errors
    if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
            return new AppError(
                MESSAGES_CONFIG.ERROR.API_KEY,
                'AUTH',
                error
            );
        }

        if (status === 429) {
            return new AppError(
                MESSAGES_CONFIG.ERROR.RATE_LIMIT,
                'RATE_LIMIT',
                error
            );
        }

        if (status >= 500) {
            return new AppError(
                'Server error. Please try again later.',
                'SERVER',
                error
            );
        }
    }

    // Generic error
    return new AppError(
        MESSAGES_CONFIG.ERROR.GENERIC,
        'GENERIC',
        error
    );
};

/**
 * Log error for monitoring
 */
export const logError = (error) => {
    // In production, send to error tracking service (e.g., Sentry)
    console.error('[Error Log]', {
        message: error.message,
        type: error.type || 'UNKNOWN',
        timestamp: error.timestamp || new Date().toISOString(),
        stack: error.stack,
    });
};