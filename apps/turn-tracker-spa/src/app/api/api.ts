import axios, { AxiosRequestConfig } from 'axios';
import {
  AuthDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});
export const api = {
  login: async (authToken?: string) => {
    const config: AxiosRequestConfig = authToken
      ? { headers: { Authorization: authToken } }
      : {};
    return axiosInstance.post<AuthDto>('/auth/login', null, config);
  },
  newToken: async (userDto: Partial<UserDto>, authToken: string) => {
    const config: AxiosRequestConfig = {
      headers: { Authorization: authToken },
    };
    return axiosInstance.post<AuthDto>('/auth/newToken', userDto, config);
  },
};
export default api;
