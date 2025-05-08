console.log(import.meta.env);

const { VITE_API_BASE_URL } = import.meta.env;

if (!VITE_API_BASE_URL) {
    throw Error("VITE_API_BASE_URL environment variable is not set");
}

export function getBaseUrl(): string {
    return String(VITE_API_BASE_URL);
}