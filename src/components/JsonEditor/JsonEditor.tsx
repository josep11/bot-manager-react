import React, { useCallback, useState } from 'react';
import { baseURL, getDefaultHeaders } from '../apiWrapper';
import './JsonEditor.css';

interface JsonEditorProps {
    onSave?: (data: any) => void;
    onError?: (error: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSave, onError }) => {
    const [jsonContent, setJsonContent] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const validateJson = useCallback((content: string): boolean => {
        try {
            JSON.parse(content);
            return true;
        } catch (error) {
            return false;
        }
    }, []);

    const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setJsonContent(content);
            setIsValid(validateJson(content));
        };
        reader.readAsText(file);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setJsonContent(content);
        setIsValid(validateJson(content));
    };

    const handleSave = async () => {
        if (!validateJson(jsonContent)) {
            setErrorMessage('Invalid JSON format');
            onError?.('Invalid JSON format');
            return;
        }

        try {
            const response = await fetch(`${baseURL}json`, {
                method: 'POST',
                headers: getDefaultHeaders(),
                body: jsonContent,
            });

            if (!response.ok) {
                throw new Error('Failed to save JSON');
            }

            const data = await response.json();
            onSave?.(data);
            setErrorMessage('');
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Failed to save JSON';
            setErrorMessage(errorMsg);
            onError?.(errorMsg);
        }
    };

    return (
        <div className="json-editor">
            <div className="file-input">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileLoad}
                    className="file-upload"
                />
            </div>
            <textarea
                value={jsonContent}
                onChange={handleContentChange}
                className={`json-textarea ${!isValid ? 'invalid' : ''}`}
                rows={20}
                cols={80}
            />
            {!isValid && <div className="error-message">Invalid JSON format</div>}
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