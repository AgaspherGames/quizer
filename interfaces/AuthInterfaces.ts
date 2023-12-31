export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface ResetPasswordRequest {
  code: string;
  password: string
}
