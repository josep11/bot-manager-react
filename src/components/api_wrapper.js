import axios from "axios";

export const baseURL = 'https://zi9bgvb5e3.execute-api.eu-west-3.amazonaws.com/Prod/';

const { REACT_APP_API_AUTHORIZATION } = process.env;

const pk = "BOT#BMR";
const url = `${baseURL}${encodeURIComponent(pk)}`;

export const getBotNames = async () => {

    console.log(process.env);
    console.log(`REACT_APP_API_AUTHORIZATION = ${REACT_APP_API_AUTHORIZATION}`);

    const resp = await axios
        .get(url, {
            headers: { 'Content-Type': 'application/json' }
        });
    if (resp.status !== 200) {
        console.error(resp);
        throw ('Error with request: ' + url);
    }
    if (resp.data && resp.data.data && resp.data.data.botList) {
        return resp.data.data.botList;
    }
    return [];
}
