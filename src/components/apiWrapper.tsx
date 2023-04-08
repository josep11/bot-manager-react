import { LastRenewedResponse } from "./model/last-renewed-response";

export const baseURL =
	"https://qp8bbyuyxb.execute-api.eu-west-3.amazonaws.com/Prod/";

// const { REACT_APP_API_AUTHORIZATION } = process.env;

const pk = "BOT#BMR";
const url = `${baseURL}${encodeURIComponent(pk)}`;

function getDefaultHeaders() {
	return {
		"Content-Type": "application/json",
		Authorization: "allow",
	};
}

export const getBotNames = async (): Promise<string[]> => {
	// console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

	const resp = await fetch(url, {
		method: "GET",
		headers: getDefaultHeaders(),
	});
	if (!resp.ok) {
		console.error(resp);
		throw new Error("Error with request: " + url);
	}
	const data = await resp.json();
	if (data.data && data.data && data.data.botList) {
		return data.data.botList;
	}
	return [];
};

export const getLastRenewed = async (
	pk: string
): Promise<LastRenewedResponse | null> => {
	const url = `${baseURL}${encodeURIComponent(pk)}`;

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
