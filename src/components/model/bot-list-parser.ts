import { BotListData } from './bot-list-data';

export const validateBotListData = (data: any): data is BotListData => {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.pk === 'string' &&
        typeof data.data === 'object' &&
        data.data !== null &&
        Array.isArray(data.data.botList) &&
        data.data.botList.every((item: any) => typeof item === 'string') &&
        Array.isArray(data.data.botListNotIncluded) &&
        data.data.botListNotIncluded.every((item: any) => typeof item === 'string')
    );
};

export const parseBotListData = (data: any): BotListData => {
    if (!validateBotListData(data)) {
        throw new Error('Invalid bot list data structure');
    }
    return data as BotListData;
}; 