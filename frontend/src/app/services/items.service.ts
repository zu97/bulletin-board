import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { CreateItemData, Item, ItemDetail } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchItems(category: string) {
    return this.http.get<Item[]>(env.apiUrl + '/items?category=' + category);
  }

  getItem(id: string) {
    return this.http.get<ItemDetail>(env.apiUrl + '/items/' + id);
  }

  createItem(token: string, itemData: CreateItemData) {
    const formData = new FormData();

    Object.keys(itemData).forEach((key) => {
      if (itemData[key]) {
        formData.append(key, itemData[key]);
      }
    });

    return this.http.post(env.apiUrl + '/items', formData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }

  removeItem(token: string, id: string) {
    return this.http.delete(env.apiUrl + '/items/' + id, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }

}
