import React from 'react';
import JsonEditor from '../components/JsonEditor/JsonEditor';
import { useTitle } from '../utils/reactUtils';

const JsonEditorPage: React.FC = () => {
    useTitle('Bot Manager - JSON Editor');

    const handleSave = (data: any) => {
        console.log('JSON saved successfully:', data);
    };

    const handleError = (error: string) => {
        console.error('Error:', error);
    };

    return (
        <div className="main">
            <h2 className="main-header">Bot Manager Configuration</h2>
            <JsonEditor onSave={handleSave} onError={handleError} />
        </div>
    );
};

export default JsonEditorPage;