import axios from 'axios';

const defaultUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/';
export const defaultUrlV1 = 'https://kinopoiskapiunofficial.tech/api/v2.1/';

// keys for api
const keys = ['430c9d5c-d456-4390-9a2f-e23a749e3f5f', 'ba7ea850-8514-40fc-a313-513692999f15', '78ec0877-cfe6-4eeb-843d-b4a39845399d'];

const api = createAxiosInstance(keys[1]);

function createAxiosInstance(apiKey) {
  return axios.create({
    baseURL: defaultUrl,
    headers: getHeaders(apiKey),
  });
}

function getHeaders(apiKey) {
  return {
    'X-API-KEY': apiKey,
    'Content-Type': 'application/json',
  };
}

// Функция для выполнения запросов с автоматическим переключением ключа при ошибке 402
export async function makeRequest(config) {
  try {
    return await api(config);
  } catch (error) {
    console.log('err', error)
    if (error.response && error.response.status === 402) {
      const currentApiKey = api.defaults.headers['X-API-KEY'];
      const nextApiKey = keys.find((key) => key !== currentApiKey);

      if (nextApiKey) {
        api.defaults.headers['X-API-KEY'] = nextApiKey;
        return makeRequest(config); // Повторяем запрос с новым ключом
      } else {
        throw new Error('All API keys are exhausted.');
      }
    } else {
      throw error;
    }
  }
}

export default api;
