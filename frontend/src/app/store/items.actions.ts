import { createAction, props } from '@ngrx/store';
import { CreateError, CreateItemData, Item, ItemDetail, ItemError } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request', props<{ category: string }>());
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{ items: Item[] }>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{ error: null | ItemError }>());

export const getItemRequest = createAction('[Items] Get Request', props<{ id: string }>());
export const getItemSuccess = createAction('[Items] Get Success', props<{ item: ItemDetail }>());
export const getItemFailure = createAction('[Items] Get Failure', props<{ error: null | ItemError }>());

export const createItemRequest = createAction('[Items] Create Request', props<{ itemData: CreateItemData }>());
export const createItemSuccess = createAction('[Items] Create Success');
export const createItemFailure = createAction('[Items] Create Failure', props<{ error: null | CreateError }>());

export const removeItemRequest = createAction('[Items] Remove Request', props<{ id: string }>());
export const removeItemSuccess = createAction('[Items] Remove Success');
export const removeItemFailure = createAction('[Items] Remove Failure', props<{ error: null | ItemError }>());
