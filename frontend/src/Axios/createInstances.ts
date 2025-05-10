import axios from "axios"

const createAxiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl
  });

  return instance;
};

export const authInstance = createAxiosInstance(`http://localhost:5000/auth/`)
export const urlInstance = createAxiosInstance(`http://localhost:5000/url/`)