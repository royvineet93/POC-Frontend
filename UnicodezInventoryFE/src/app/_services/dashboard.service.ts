import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../common';
import { Observable } from 'rxjs';
const countApi = '/common/count';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getClientCount(): Observable<any> {
    return this.http.get<any>(baseUrl + countApi + '/client');
  }

  getVendorCount(): Observable<any> {
    return this.http.get<any>(baseUrl + countApi + '/vendor');
  }

  getItemCount(): Observable<any> {
    return this.http.get<any>(baseUrl + countApi + '/item');
  }
}
