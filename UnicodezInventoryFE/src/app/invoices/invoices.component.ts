import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice, Item } from '../_models';

@Component({
  selector: 'app-users',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'issueDate', 'docNo', 'clientName', 'dueDate', 'amount', 'dateOfPayement', 'balance'];
  displayedHeaders: string[] = ['select', 'Issue Date', 'Doc. No.', 'Client Name', 'Due Date', 'Amount', 'Date of Payement', 'Balance'];
  serviceType = 'invoiceService';
  dataSource: MatTableDataSource<any>;

  constructor() {
  }



  transformInvoice(invoices: Invoice[]): any {
    const invoiceArray = [];
    for (const invoice of invoices) {
      let amount = 0;
      invoice.items.forEach(element => {
        amount += element.unitPrice ?element.unitPrice:0 * element.quantity;
      });
      const invObject = {
        issueDate: invoice.invoiceDate,
        docNo: invoice.invoiceNo,
        clientName: invoice.clientName,
        dueDate: invoice.dueDate,
        amount: amount,
        dateOfPayement: '20-Oct-2020',
        balance: '25,76,000',
        id: invoice._id,
        items : invoice.items,
        paymentTerms: invoice.paymentTerms,
        PODate:invoice.PODate,
        privacyNotes: invoice.privacyNotes,
        termsAndConditions :invoice.termsAndConditions,
        invoiceNo :invoice.invoiceNo,
        PONo :invoice.PONo,
        invoiceDate:invoice.invoiceDate
      };
      invoiceArray.push(invObject);
    }
    return invoiceArray;
  }



  ngOnInit(): void {
  }
}
