import axios from "axios";

export function client() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 3000,
  })
}

export function localClient() {
  return axios.create({
    baseURL: '/api',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 3000,
  })
}

export const errorParser = (response) => {
  const status = response.response?.status || 404;
  const message = response.response?.data?.message || `No internet connection`;

  return {
    error: true,
    status,
    message,
  }
}