import { LastRenewed } from "../components/model/last-renewed";

export const orderBots = (APIData: LastRenewed[], botNames: string[]) => {
	const newAPIData: LastRenewed[] = [];
	for (const botName of botNames) {
		for (const bot of APIData) {
			if (botName === bot.name) {
				newAPIData.push(bot);
				continue;
			}
		}
	}
	return newAPIData;
};
