import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../common';
const itemApi = '/items';
const exportApi = '/common/exportReport/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  exportReport(): Observable<any> {
    return this.http.get<any>(baseUrl + exportApi);
  }

  getItems(): Observable<any> {
    return this.http.get<any>(baseUrl + itemApi);
  }

  saveItem(item: any): Observable<any> {
    return this.http.post<any>(baseUrl + itemApi, item);
  }

  updateItem(item: Observable<any>) {
    return this.http.put<any>(baseUrl + itemApi, item);
  }

  deleteItem(id: number): Observable<{}> {
    return this.http.delete(baseUrl + itemApi + '/' + id);
  }
}
