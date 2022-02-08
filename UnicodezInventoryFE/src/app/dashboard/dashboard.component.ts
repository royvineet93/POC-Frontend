import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../_services/dashboard.service';
import {MatTableDataSource} from "@angular/material/table";
import {Item} from "../_models/item";
import {Client, Invoice} from '../_models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clientCount: any;
  vendorCount: any;
  itemCount: any;

  displayedColumns: string[] = ['select', 'name', 'itemCode', 'description', 'quantity', 'unit', 'tax','HSN', 'SAC', 'itemType','salesInfo', 'purchaseInfo'];
  displayedHeaders: string[] = ['select', 'Item Name', 'Item Code', 'Description', 'Quantity', 'Unit', 'Tax','HSN', 'SAC', 'Item Type','Sales Info', 'Purchase Info'];
  dataSource : MatTableDataSource<any>;
  serviceType = "itemService";

  displayedColumnsInvoice: string[] = ['select', 'issueDate', 'docNo', 'clientName', 'dueDate', 'amount', 'dateOfPayement', 'balance'];
  displayedHeadersInvoice: string[] = ['select', 'Issue Date', 'Doc. No.', 'Client Name', 'Due Date', 'Amount', 'Date of Payement', 'Balance'];
  serviceTypeInvoice = 'invoiceService';
  dataSourceInvoice: MatTableDataSource<any>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getClientCount().subscribe(data => {
      this.clientCount = data.count;
    });
    this.dashboardService.getItemCount().subscribe(data => {
      this.vendorCount = data.count;
    });
    this.dashboardService.getVendorCount().subscribe(data => {
      this.itemCount = data.count;
    });
  }

  transformItem(items: Item[]): any {
    let itemArray = [];
    for (const item of items) {
      let itemObject = {
        "name": item.name,
        "itemCode": item.itemCode,
        "description": item.description,
        "quantity": item.quantity,
        "id": item._id
      };
      itemArray.push(itemObject);
    }
    return itemArray;
  }

  transformInvoice(invoices: Invoice[]): any {
    let invoiceArray = [];
    for (const invoice of invoices) {
      let invoiceObject = {
        "clientName": invoice.clientName,
        "docNo": invoice.invoiceNo,
        "issueDate": invoice.invoiceDate,
        "dueDate": invoice.dueDate,
        "id": invoice._id
      };
      invoiceArray.push(invoiceObject);
    }
    return invoiceArray;
  }
}
