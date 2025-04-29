import { BotListData } from "./model/bot-list-data";
import { parseBotListData } from "./model/bot-list-parser";
import { LastRenewedResponse } from "./model/last-renewed-response";

export const baseURL =
	"https://qp8bbyuyxb.execute-api.eu-west-3.amazonaws.com/Prod/";

// const { REACT_APP_API_AUTHORIZATION } = process.env;

const pk = "BOT#BMR";
const url = `${baseURL}${encodeURIComponent(pk)}`;

export function getDefaultHeaders() {
	return {
		"Content-Type": "application/json",
		Authorization: "allow",
	};
}

async function fetchBotListData() {
	const resp = await fetch(url, {
		method: "GET",
		headers: getDefaultHeaders(),
	});
	if (!resp.ok) {
		console.error(resp);
		throw new Error("Error with request: " + url);
	}
	const data = await resp.json();
	return data;
}

export const getBotNames = async (): Promise<string[]> => {
	// console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

	const data = await fetchBotListData();
	if (data.data && data.data && data.data.botList) {
		return data.data.botList;
	}
	return [];
};

export const getLastRenewed = async (
	pk: string
): Promise<LastRenewedResponse | null> => {
	try {
		const resp = await fetch(url, {
			method: "GET",
			headers: getDefaultHeaders(),
		});

		if (!resp.ok) {
			console.error("Error with request on pk: " + pk);

			console.error(resp);
			if (resp.status === 404) {
				return {
					pk,
				};
			}
			return null;
		}

		const data = await resp.json();
		return data as LastRenewedResponse;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getBotManagerList = async (): Promise<BotListData> => {
	try {
		const mockJson = `{
 "pk": "BOT#BMR",
 "data": {
  "botList": [
   "Impuls Bot"
  ],
  "botListNotIncluded": [
   "DigitalNomads"
  ]
 }
}`;
		return parseBotListData(JSON.parse(mockJson));

		const response = await fetch(`${baseURL}bot-manager-list`, {
			method: "GET",
			headers: getDefaultHeaders(),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch bot manager list");
		}

		const data = await response.json();
		return parseBotListData(data);
	} catch (error) {
		console.error("Error fetching bot manager list:", error);
		throw error;
	}
};

