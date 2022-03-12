import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Item, ItemError } from '../../models/item.model';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';
import { fetchItemsRequest } from '../../store/items.actions';
import { environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  apiUrl = env.apiUrl;
  category: undefined | Category;

  categories: Observable<Category[]>;
  categoriesLoading: Observable<boolean>;
  categoriesError: Observable<null | ItemError>;

  items: Observable<Item[]>;
  itemsLoading: Observable<boolean>;
  itemsError: Observable<null | ItemError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.categories = store.select(state => state.categories.categories);
    this.categoriesLoading = store.select(state => state.categories.fetchLoading);
    this.categoriesError = store.select(state => state.categories.fetchError);

    this.items = store.select(state => state.items.items);
    this.itemsLoading = store.select(state => state.items.fetchLoading);
    this.itemsError = store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
    this.store.dispatch(fetchItemsRequest({ category: '' }));
  }

  changeCategory(category?: Category) {
    this.category = category;
    this.store.dispatch(fetchItemsRequest({ category: category?._id || '' }));
  }

}
