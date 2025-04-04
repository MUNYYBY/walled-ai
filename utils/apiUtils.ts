import axios from "axios";
import baseUrl from "./baseUrl";

export const getApiKeys = async () => {
    const userInfo : any = localStorage.getItem('userInfo');
    const token = JSON.parse(userInfo)?.access_token;
    try {
        const response : any = await axios.get(`${baseUrl}/api-key`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response) {
            throw new Error('Failed to fetch API keys');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching API keys:', error);
        return [];
    }
};