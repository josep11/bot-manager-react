export const baseURL =
	"https://qp8bbyuyxb.execute-api.eu-west-3.amazonaws.com/Prod/";

// const { REACT_APP_API_AUTHORIZATION } = process.env;

const pk = "BOT#BMR";
const url = `${baseURL}${encodeURIComponent(pk)}`;

function getDefaultHeaders() {
	return {
		"Content-Type": "application/json",
		Authorization: "allow",
		// AuthorizationToken: REACT_APP_API_AUTHORIZATION,
	};
}

export const getBotNames = async () => {
	// console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

	const resp = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "allow",
			// AuthorizationToken: REACT_APP_API_AUTHORIZATION,
		},
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

export const getLastRenewed = async (pk) => {
	const url = `${baseURL}${encodeURIComponent(pk)}`;

	// if (num_req_finished === 1 || num_req_finished === 2) { url += '4' }
	const resp = await fetch(url, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json",
			"Authorization": "allow",
		},
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

	return await resp.json();
};
