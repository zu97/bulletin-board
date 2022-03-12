import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCategoriesRequest } from '../../store/categories.actions';
import { NgForm } from '@angular/forms';
import { createItemRequest } from '../../store/items.actions';
import { CreateError, ItemError } from '../../models/item.model';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  categories: Observable<Category[]>;
  categoriesLoading: Observable<boolean>;
  categoriesError: Observable<null | ItemError>;

  createLoading: Observable<boolean>;
  createError: Observable<null | CreateError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.categories = store.select(state => state.categories.categories);
    this.categoriesLoading = store.select(state => state.categories.fetchLoading);
    this.categoriesError = store.select(state => state.categories.fetchError);

    this.createLoading = store.select(state => state.items.createLoading);
    this.createError = store.select(state => state.items.createError);
  }
  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(createItemRequest({itemData: this.form.value}));
  }
}
