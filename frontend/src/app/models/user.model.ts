export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  token: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface FieldError {
  message: string;
}

export interface RegisterError {
  errors: {
    email: FieldError;
    password: FieldError;
    name: FieldError;
    phone: FieldError;
  }
}

export interface LoginError {
  error: string;
}
