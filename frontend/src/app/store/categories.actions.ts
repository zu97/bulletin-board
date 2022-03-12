import { createAction, props } from '@ngrx/store';
import { Category, CategoryError } from '../models/category.model';

export const fetchCategoriesRequest = createAction(
  '[Categories] Fetch Request'
);
export const fetchCategoriesSuccess = createAction(
  '[Categories] Fetch Success',
  props<{ categories: Category[] }>()
);
export const fetchCategoriesFailure = createAction(
  '[Categories] Fetch Failure',
  props<{ error: null | CategoryError }>()
);
