import axios from 'axios';

const defaultUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/';

const api = axios.create({
    baseURL: defaultUrl,
    headers: {
        'X-API-KEY': 'ba7ea850-8514-40fc-a313-513692999f15',
        'Content-Type': 'application/json',
    },
});



export default api