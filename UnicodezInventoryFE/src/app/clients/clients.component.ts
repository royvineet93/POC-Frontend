import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../_models';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'companyName', 'contactName', 'phone', 'email', 'gstin', 'panId', 'tin',
    'vat', 'website', 'billingAddress', 'notes'];
  displayedHeaders: string[] = ['select', 'Client Name', 'Contact Name', 'Phone', 'Email', 'GSTIN', 'Pan Id', 'TIN',
    'VAT', 'Website', 'Billing Address', 'Comment/Notes'];
  serviceType = 'clientService';
  dataSource: MatTableDataSource<any>;

  constructor() {
  }


  transformClient(clients: Client[]): any {
    const clientArray = [];
    for (const client of clients) {
      const clientObject = {
        companyName: client.companyName,
        phone: client.phone,
        email: client.email,
        gstin: client.gstin,
        panId: client.panId,
        tin: client.tin,
        vat: client.vat,
        website: client.website,
        billingAddress: client.billingAddress,
        notes: client.notes,
        contactDetails: client.contactDetails[0],
        shippingAddress: client.shippingAddress,
        otherInfo: client.otherInfo,
        id: client._id
      };
      clientArray.push(clientObject);
    }
    return clientArray;
  }

  ngOnInit(): void {
  }
}
