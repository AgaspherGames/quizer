export interface RegisterRequest {
  fio: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  fio: string;
  email: string;
}
