import axios from "axios"

const createAxiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl
  });

  return instance;
};

export const authInstance = createAxiosInstance(`${import.meta.env.VITE_API_URL}/auth`)
export const urlInstance = createAxiosInstance(`${import.meta.env.VITE_API_URL}/url`)