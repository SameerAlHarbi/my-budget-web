export interface UserModel {
  isAdmin: boolean;
  userName: string;
  email: string;
}

export interface AuthResponseData {
  user: UserModel;
  token: string;
}
