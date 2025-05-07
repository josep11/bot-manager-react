import { BotListData } from "./model/bot-list-data";
import { parseBotListData } from "./model/bot-list-parser";
import { LastRenewedResponse } from "./model/last-renewed-response";

export const BASE_URL =
	"https://qp8bbyuyxb.execute-api.eu-west-3.amazonaws.com/Prod/";

// const { REACT_APP_API_AUTHORIZATION } = process.env;

const pkBMR = "BOT#BMR";
export const botListUrl = `${BASE_URL}${encodeURIComponent(pkBMR)}`;

const authUrl = `${BASE_URL}auth`;

export async function authenticate(username: string, password: string): Promise<void> {
	const response = await fetch(authUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'allow'
		},
		body: JSON.stringify({
			username: username,
			password: password
		}),
	});

	if (!response.ok) {
		throw new Error('Authentication failed');
	}
}

export function getDefaultHeaders() {
	return {
		"Content-Type": "application/json",
		Authorization: "allow",
		// With the following it will not work
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		// "Access-Control-Allow-Headers": "Content-Type, Authorization"
	};
}

async function fetchBotListData(): Promise<BotListData> {
	const resp = await fetch(botListUrl, {
		method: "GET",
		headers: getDefaultHeaders(),
	});
	if (!resp.ok) {
		console.error(resp);
		throw new Error("Error with request: " + botListUrl);
	}
	const data = await resp.json();
	return parseBotListData(data);
}

export const getBotNames = async (): Promise<string[]> => {
	// console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

	const botListData = await fetchBotListData();
	console.log(botListData.data.botList);
	return botListData.data.botList;
};

export const getLastRenewed = async (
	pk: string
): Promise<LastRenewedResponse | null> => {
	const url = `${BASE_URL}${encodeURIComponent(pk)}`;

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
	return await fetchBotListData();
	/* Sample JSON Response
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
*/
};

