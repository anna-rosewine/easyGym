export interface AuthInfo {
  mail: string,
  password: string
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}
