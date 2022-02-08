import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../common';
import {Invoice} from '../_models';
import { buffer } from 'rxjs/operators';
const invoiceApi = '/invoice';
const commonApi = '/common/';
const exportApi = '/common/exportReport';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) { }

  exportReport(service): Observable<any> {
    const options={
      responseType:'arraybuffer',
      reportProgress:Boolean
    }
    return this.http.get<any>(baseUrl + exportApi+`/${service}`,{responseType:'arraybuffer' as 'json'});
  }

  getInvoices(): Observable<any> {
    return this.http.get<any>(baseUrl + invoiceApi);
  }

  saveInvoice(invoice: Invoice): Observable<any> {
    return this.http.post<any>(baseUrl + invoiceApi, invoice);
  }

  updateInvoice(invoice) {
    return this.http.put<any>(baseUrl + invoiceApi, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(baseUrl + invoiceApi + '/' + id);
  }

  getTax(): Observable<any> {
    return this.http.get<any>(baseUrl + commonApi + 'tax');
  }

  getUnit(): Observable<any> {
    return this.http.get<any>(baseUrl + commonApi + 'unit');
  }

  getClientNames(): Observable<any> {
    return this.http.get<any>(baseUrl + commonApi + 'clientNames');
  }

  transformInvoiceObj(data: any, id: any ,itemData:any): Invoice {
    const invoiceObject: Invoice = {
      _id: id,
      clientName: data.clientName ? data.clientName : '',
      invoiceNo: data.invoiceNo ? data.invoiceNo : '',
      invoiceDate: data.invoiceDate ? data.invoiceDate : '',
      dueDate: data.dueDate ? data.dueDate : '',
      PONo: data.PONo ? data.PONo : '',
      PODate: data.PODate ? data.PODate : '',
      paymentTerms: data.paymentTerms ? data.paymentTerms : '',
      termsAndConditions: data.termsAndConditions ? data.termsAndConditions : '',
      privacyNotes: data.privacyNotes ? data.privacyNotes : '',
      items: itemData ? itemData : '',
      status: data.status ? data.status : 'UNPAID',
    };
    return invoiceObject;
  }
}
