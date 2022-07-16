import axios, { AxiosRequestConfig } from 'axios';
import {
  AuthDto,
  LobbyDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { environment } from '../../environments/environment';

const axiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
});
const authConfig = (authToken?: string): AxiosRequestConfig =>
  authToken ? { headers: { Authorization: authToken } } : {};
export const api = {
  login: async (authToken?: string) =>
    axiosInstance.post<AuthDto>('/auth/login', null, authConfig(authToken)),
  newToken: async (userDto: Partial<UserDto>, authToken: string) =>
    axiosInstance.post<AuthDto>(
      '/auth/newToken',
      userDto,
      authConfig(authToken)
    ),
  createLobby: async (authToken: string) =>
    axiosInstance.post<LobbyDto>('/lobby/create', null, authConfig(authToken)),
};
export default api;
