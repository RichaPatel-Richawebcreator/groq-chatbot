import { useState, useCallback } from 'react';
import groqService from '../services/groqService';
import { validateMessage } from '../utils/validators';
import { generateId } from '../utils/helpers';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = useCallback(async (content) => {
        // Clear previous error
        setError(null);

        // Validate message
        const validation = validateMessage(content);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        // Create user message
        const userMessage = {
            id: generateId(),
            role: 'user',
            content: validation.value,
            timestamp: new Date().toISOString(),
        };

        // Add user message immediately
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Prepare messages for API
            const apiMessages = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            // Send to API
            const response = await groqService.sendMessage(apiMessages);

            // Create AI message
            const aiMessage = {
                id: generateId(),
                role: 'assistant',
                content: response.content,
                timestamp: new Date().toISOString(),
                usage: response.usage,
            };

            // Add AI message
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            setError(err.message);

            // Add error message to chat
            const errorMessage = {
                id: generateId(),
                role: 'assistant',
                content: err.message,
                timestamp: new Date().toISOString(),
                isError: true,
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    const deleteMessage = useCallback((messageId) => {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        deleteMessage,
    };
};