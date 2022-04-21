import { Role } from 'src/interfaces/role';
import axiosInstance from 'src/services/config';

export const signInPost = async (userName: string, password: string) => {
  return axiosInstance.post('/user/sign-in', { userName, password });
};

export const signUpPost = async (userName: string, password: string, role: Role) => {
  return axiosInstance.post('/user/create', { userName, password, role });
};
