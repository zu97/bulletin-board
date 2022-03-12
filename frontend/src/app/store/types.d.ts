import { LoginError, RegisterError, User } from '../models/user.model';
import { Category } from '../models/category.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type CategoriesState = {
  categories: Category[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type AppState = {
  users: UsersState,
};
