import axios from "axios";

export const baseURL = 'https://zi9bgvb5e3.execute-api.eu-west-3.amazonaws.com/Prod/';

const { REACT_APP_API_AUTHORIZATION } = process.env;

const pk = "BOT#BMR";
const url = `${baseURL}${encodeURIComponent(pk)}`;

export const getBotNames = async () => {
    console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // AuthorizationToken: REACT_APP_API_AUTHORIZATION,
        }
    });
    if (!resp.ok) {
        console.error(resp);
        throw new Error('Error with request: ' + url);
    }
    const data = await resp.json()
    if (data.data && data.data && data.data.botList) {
        return data.data.botList;
    }
    return [];
}
