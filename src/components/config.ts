const { REACT_APP_BASE_URL } = process.env;

if (!REACT_APP_BASE_URL) {
    throw Error("fix env");
}

export function getBaseUrl(): string {
    return String(REACT_APP_BASE_URL);
}