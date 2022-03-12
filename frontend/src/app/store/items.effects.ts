import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import { HelpersService } from '../services/helpers.service';
import {
  createItemFailure,
  createItemRequest, createItemSuccess,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess, getItemFailure,
  getItemRequest,
  getItemSuccess, removeItemFailure, removeItemRequest, removeItemSuccess
} from './items.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
import { AppState } from './types';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class ItemsEffects {

  constructor(
    private router: Router,
    private actions: Actions,
    private itemsService: ItemsService,
    private helpersService: HelpersService,
    private store: Store<AppState>
  ) {
  }

  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(({category}) => this.itemsService.fetchItems(category).pipe(
      map((items) => fetchItemsSuccess({items})),
      this.helpersService.catchServerError(fetchItemsFailure),
    )),
  ));

  getItem = createEffect(() => this.actions.pipe(
    ofType(getItemRequest),
    mergeMap(({id}) => this.itemsService.getItem(id).pipe(
      map((item) => getItemSuccess({item})),
      this.helpersService.catchServerError(getItemFailure),
    )),
  ));

  createItem = createEffect(() => this.actions.pipe(
    ofType(createItemRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      if (user) {
        return this.itemsService.createItem(user.token, data.itemData).pipe(
          map(() => createItemSuccess()),
          tap(() => {
            this.helpersService.openSnackBar('Item successfully added');
            void this.router.navigate(['/']);
          }),
          this.helpersService.catchServerError(createItemFailure),
        )
      }

      return NEVER;
    }),
  ));

  removeItem = createEffect(() => this.actions.pipe(
    ofType(removeItemRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([data, user]) => {
      if (user) {
        return this.itemsService.removeItem(user.token, data.id).pipe(
          map(() => removeItemSuccess()),
          tap(() => {
            this.helpersService.openSnackBar('Item successfully removed');
            void this.router.navigate(['/']);
          }),
          this.helpersService.catchServerError(removeItemFailure),
        )
      }

      return NEVER;
    }),
  ));


}
