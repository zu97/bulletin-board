import { LoginError, RegisterError, User } from '../models/user.model';
import { Category, CategoryError } from '../models/category.model';
import { CreateError, Item, ItemDetail, ItemError } from '../models/item.model';

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
  fetchError: null | CategoryError,
};

export type ItemsState = {
  items: Item[],
  item: null | ItemDetail,
  fetchLoading: boolean,
  fetchError: null | ItemError,
  getLoading: boolean,
  getError: null | ItemError,
  createLoading: boolean,
  createError: null | CreateError,
  removeLoading: boolean,
  removeError: null | ItemError,
};

export type AppState = {
  users: UsersState,
  categories: CategoriesState,
  items: ItemsState,
};
