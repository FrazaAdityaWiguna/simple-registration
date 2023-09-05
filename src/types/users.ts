export type PayloadGetListUser = {
  page: number;
};

export type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SupportData = {
  url: string;
  text: string;
};

export type DataUsersType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
  support: SupportData;
};

export type ApiResponseDataUsers = {
  data: DataUsersType;
};

export type PayloadRegisterUsers = {
  email: string;
  password: string;
};

export type ResponseRegister = {
  id: number;
  token: string;
};

export type ApiResponseRegister = {
  data: ResponseRegister;
};

export type ApiResponseDelete = {
  data: string;
};

export type PayloadDeleteSingleUser = {
  id: number;
};

export type PayloadUpdateUser = {
  name: string;
  job: string;
};

export type ResponseUpdateUser = {
  name: string;
  job: string;
  updateAt: string;
};

export type ApiResponseUpdateUser = {
  data: ResponseUpdateUser;
};

export type ResponseSingleUser = {
  data: UserData;
  support: SupportData;
};

export type ApiResponseSingleUser = {
  data: ResponseSingleUser;
};
