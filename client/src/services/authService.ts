// authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
