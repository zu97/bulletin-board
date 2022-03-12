import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDetail, ItemError } from '../../models/item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute, Router } from '@angular/router';
import { getItemRequest, removeItemRequest } from '../../store/items.actions';
import { environment as env } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  apiUrl = env.apiUrl;
  itemId!: string;

  user: Observable<null | User>;

  item: Observable<null | ItemDetail>;
  getLoading: Observable<boolean>;
  getError: Observable<null | ItemError>;

  removeLoading: Observable<boolean>;
  removeError: Observable<null | ItemError>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);

    this.item = store.select(state => state.items.item);
    this.getLoading = store.select(state => state.items.getLoading);
    this.getError = store.select(state => state.items.getError);

    this.removeLoading = store.select(state => state.items.removeLoading);
    this.removeError = store.select(state => state.items.removeError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['id'];
      if (id) {
        this.itemId = id;
        return this.store.dispatch(getItemRequest({id}));
      }

      void this.router.navigate(['/404']);
    });
  }

  onRemove(): void {
    this.store.dispatch(removeItemRequest({id: this.itemId}));
  }
}
