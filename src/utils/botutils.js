
export const botNames = [
    'Milanuncios',
    'Wallapop',
    'Feinaactiva',
    'Infofeina',
    'DigitalNomads'
];

export const orderBots = (APIData, botNames) => {
    const newAPIData = []
    for (const botName of botNames) {
        for (const bot of APIData) {
            if (botName === bot.name) {
                newAPIData.push(bot);
                continue;
            }
        }
    }
    return newAPIData
}
