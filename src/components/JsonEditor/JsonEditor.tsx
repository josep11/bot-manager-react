import React, { useCallback, useEffect, useState } from 'react';
import { getBotManagerList, getDefaultHeaders } from '../apiWrapper';
import AuthForm from '../AuthForm/AuthForm';
import { getBaseUrl } from '../config';
import { BotListData } from '../model/bot-list-data';
import { parseBotListData, validateBotListData } from '../model/bot-list-parser';
import './JsonEditor.css';

const baseUrl = getBaseUrl();
interface JsonEditorProps {
    onSave?: (data: BotListData) => void;
    onError?: (error: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSave, onError }) => {
    const [jsonContent, setJsonContent] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthorized(!!token);
    }, []);

    useEffect(() => {
        if (!isAuthorized) return;

        const fetchData = async () => {
            try {
                const data = await getBotManagerList();
                setJsonContent(JSON.stringify(data, null, 2));
                setIsValid(true);
                setErrorMessage('');
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : 'Failed to load data';
                setErrorMessage(errorMsg);
                onError?.(errorMsg);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [onError, isAuthorized]);

    const handleAuthSuccess = () => {
        setIsAuthorized(true);
    };

    const handleAuthError = (error: string) => {
        setErrorMessage(error);
        onError?.(error);
    };

    const validateJson = useCallback((content: string): boolean => {
        try {
            const parsed = JSON.parse(content);
            return validateBotListData(parsed);
        } catch (error) {
            return false;
        }
    }, []);

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setJsonContent(content);
        setIsValid(validateJson(content));
    };

    const handleSave = async () => {
        if (!validateJson(jsonContent)) {
            setErrorMessage('Invalid JSON format or data structure');
            onError?.('Invalid JSON format or data structure');
            return;
        }

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: getDefaultHeaders(),
                body: jsonContent,
            });

            if (!response.ok) {
                throw new Error('Failed to save JSON');
            }

            const data = await response.json();
            const parsedData = parseBotListData(data);
            onSave?.(parsedData);
            setErrorMessage('');
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Failed to save JSON';
            setErrorMessage(errorMsg);
            onError?.(errorMsg);
        }
    };

    if (!isAuthorized) {
        return <AuthForm onSuccess={handleAuthSuccess} onError={handleAuthError} />;
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="json-editor">
            <textarea
                value={jsonContent}
                onChange={handleContentChange}
                className={`json-textarea ${!isValid ? 'invalid' : ''}`}
                rows={20}
                cols={80}
            />
            {!isValid && <div className="error-message">Invalid JSON format or data structure</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button
                onClick={handleSave}
                disabled={!isValid || !jsonContent}
                className="save-button"
            >
                Save
            </button>
        </div>
    );
};

export default JsonEditor;