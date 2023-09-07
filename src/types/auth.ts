export type PayloadLoginType = {
  email: string;
  password: string;
};

export type ResponseLoginType = {
  token: string;
};

export type ApiResponseLoginType = {
  data: ResponseLoginType;
};
