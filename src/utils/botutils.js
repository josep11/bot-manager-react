
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

