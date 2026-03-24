
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

export async function fetchStockData(queryParams) {
    const url = `${BASE_URL}${new URLSearchParams({
        ...queryParams,
        apikey: API_KEY,
    })}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch stock data");
    }
     return response.json();
    
}