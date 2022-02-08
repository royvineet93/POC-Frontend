import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../common';
import { Client } from '../_models';
import { Observable } from 'rxjs';
const clientApi = '/client';
const exportApi = '/common/exportReport/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  exportReport(): Observable<any> {
    return this.http.get<any>(baseUrl + exportApi);
  }

  getClients(): Observable<any> {
    return this.http.get<any>(baseUrl + clientApi);
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post<any>(baseUrl + clientApi, client);
  }

  updateClient(client): Observable<any>{
    return this.http.put<any>(baseUrl + clientApi, client);
  }

  deleteClient(id: number): Observable<{}> {
    return this.http.delete(baseUrl + clientApi + '/' + id);
  }

  transformClientObj(data: any, id: any): Client {
    const clientObject: Client = {
      _id: id,
      companyName: data.companyName ? data.companyName : '',
      phone: data.phone ? data.phone : '',
      email: data.email ? data.email : '',
      gstin: data.gstin ? data.gstin : '',
      panId: data.panId ? data.panId : '',
      tin: data.tin ? data.tin : '',
      vat: data.vat ? data.vat : '',
      website: data.website ? data.website : '',
      currency: data.currency ? data.currency : '',
      contactDetails: data.contactDetails ? data.contactDetails : [{
        contactName: data.contactName ? data.contactName : '',
        contactEmail: data.contactEmail ? data.contactEmail : '',
        contactPhone: data.contactPhone ? data.contactPhone : ''
      }],
      billingAddress: data.billingAddress ? data.billingAddress :  {
        address: data.billAdd ? data.billAdd : '',
        country: data.billCountry ? data.billCountry : '',
        state: data.billState ? data.billState : '',
        city: data.billCity ? data.billCity : '',
        pincode: data.billPincode ? data.billPincode : ''
      },
      shippingAddress: data.shippingAddress ? data.shippingAddress :  {
        address: data.shipAdd ? data.shipAdd : '',
        country: data.shipCountry ? data.shipCountry : '',
        state: data.shipState ? data.shipState : '',
        city: data.shipCity ? data.shipCity : '',
        pincode: data.shipPincode ? data.shipPincode : ''
      },
      otherInfo: data.otherInfo ? data.otherInfo :  {
        facebook: data.facebook ? data.facebook : '',
        lst: data.lst ? data.lst : '',
        cst: data.cst ? data.cst : '',
        serviceTax: data.serviceTax ? data.serviceTax : '',
      },
      notes: data.notes ? data.notes : ''
    };
    return clientObject;
  }
}
