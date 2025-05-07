const { BASE_URL } = process.env;

if (!BASE_URL) {
    throw Error("fix env");
}

export function getBaseUrl(): string {
    return String(BASE_URL);
}