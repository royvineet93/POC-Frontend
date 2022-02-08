import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../common';
const payementApi = '/payment';
@Injectable({
    providedIn: 'root'
})
export class PayementService {
    constructor(private http: HttpClient) { }

    razorPayOrder(any){
        return this.http.post<any>(baseUrl + payementApi, any);
    }
}
