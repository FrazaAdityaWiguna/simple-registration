import { httpClient } from "@/config/httpClient";
import {
  ApiResponseDataUsers,
  ApiResponseDelete,
  ApiResponseRegister,
  ApiResponseSingleUser,
  ApiResponseUpdateUser,
  PayloadDeleteSingleUser,
  PayloadGetListUser,
  PayloadRegisterUsers,
  PayloadUpdateUser,
} from "@/types/users";
import { ENDPOINT } from "../endpoint";

export const getListUsers = (
  payload: PayloadGetListUser
): Promise<ApiResponseDataUsers> => {
  return httpClient.get(`${ENDPOINT.GET_LIST_USERS}`, { params: payload });
};

export const postRegisterUser = (
  payload: PayloadRegisterUsers
): Promise<ApiResponseRegister> => {
  return httpClient.post(`${ENDPOINT.REGISTER_USER}`, payload);
};

export const deleteSingleUser = (
  payload: PayloadDeleteSingleUser
): Promise<ApiResponseDelete> => {
  return httpClient.delete(`${ENDPOINT.GET_LIST_USERS}/${payload.id}`);
};

export const updateSingleUser = (
  payload: PayloadUpdateUser
): Promise<ApiResponseUpdateUser> => {
  return httpClient.put(`${ENDPOINT.GET_LIST_USERS}`, payload);
};

export const getSingleUser = (
  payload: PayloadDeleteSingleUser
): Promise<ApiResponseSingleUser> => {
  return httpClient.get(`${ENDPOINT.GET_LIST_USERS}`, { params: payload });
};
