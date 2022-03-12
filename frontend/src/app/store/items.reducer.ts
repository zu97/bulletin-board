import { ItemsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createItemFailure,
  createItemRequest, createItemSuccess,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess, getItemFailure,
  getItemRequest,
  getItemSuccess, removeItemFailure, removeItemRequest, removeItemSuccess
} from './items.actions';

const initialState: ItemsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchError: null,
  getLoading: false,
  getError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchItemsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(getItemRequest, state => ({...state, getLoading: true, getError: null})),
  on(getItemSuccess, (state, {item}) => ({...state, getLoading: false, item})),
  on(getItemFailure, (state, {error}) => ({...state, getLoading: false, getError: error})),

  on(createItemRequest, state => ({...state, createLoading: true, createError: null})),
  on(createItemSuccess, state => ({...state, createLoading: false})),
  on(createItemFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(removeItemRequest, state => ({...state, removeLoading: true, removeError: null})),
  on(removeItemSuccess, state => ({...state, removeLoading: false})),
  on(removeItemFailure, (state, {error}) => ({...state, removeLoading: false, removeError: error})),
)
