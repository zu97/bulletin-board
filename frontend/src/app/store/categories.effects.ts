import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../services/categories.service';
import { HelpersService } from '../services/helpers.service';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class CategoriesEffects {

  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
    private helpersService: HelpersService,
  ) {}

  fetchCategories = createEffect(() => this.actions.pipe(
      ofType(fetchCategoriesRequest),
      mergeMap(() => this.categoriesService.fetchCategories().pipe(
        map((categories) => fetchCategoriesSuccess({categories})),
        this.helpersService.catchServerError(fetchCategoriesFailure),
      )),
  ));

}
