import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Vendor} from '../_models/vendor';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'companyName', 'contactName', 'phone', 'email', 'gstin','panId',
    'vat', 'website', 'vendorCode', 'billingAddress', 'notes'];
  displayedHeaders: string[] = ['select', 'Vendor Name', 'Contact Name', 'Mobile', 'Email', 'GSTIN','PAN Id',
    'VAT', 'Website', 'Vendor Code', 'Billing Address', 'Comment/Notes'];
  dataSource: MatTableDataSource<any>;
  serviceType = 'vendorService';

  constructor() {
  }

  transformVendor(vendors: Vendor[]): any {
    const vendorArray = [];
    for (const vendor of vendors) {
      const vendorObject = {
        companyName: vendor.companyName,
        phone: vendor.phone,
        email: vendor.email,
        gstin: vendor.gstin,
        panId: vendor.panId,
        vat: vendor.vat,
        website: vendor.website,
        billingAddress: vendor.billingAddress,
        notes: vendor.notes,
        contactDetails: vendor.contactDetails[0],
        shippingAddress: vendor.shippingAddress,
        otherInfo: vendor.otherInfo,
        id: vendor._id
      };
      vendorArray.push(vendorObject);
    }
    return vendorArray;
  }

  ngOnInit(): void {
  }
}
