import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Item} from "../_models/item";

@Component({
  selector: 'app-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['select', 'name', 'itemCode', 'description', 'quantity', 'unit', 'tax','HSN', 'SAC', 'itemType','salesInfo', 'purchaseInfo'];
  displayedHeaders: string[] = ['select', 'Item Name', 'Item Code', 'Description', 'Quantity', 'Unit', 'Tax','HSN', 'SAC', 'Item Type','Sales Info', 'Purchase Info'];
  dataSource : MatTableDataSource<any>;
  serviceType = "itemService";
  

  ngAfterViewInit() {
  }

  transformItem(items: Item[]): any {
    let itemArray = [];
    for (const item of items) {
      let itemObject = {
        "name": item.name,
        "itemCode": item.itemCode,
        "description": item.description,
        "quantity": item.quantity,
        "unit": item.unit,
        "tax": item.tax,
        "HSN": item.HSN,
        "SAC": item.SAC,
        "itemType": item.itemType,
        "salesInfo": item.salesInfo,
        "purchaseInfo": item.purchaseInfo,
        "id": item._id
      };
      itemArray.push(itemObject);
    }
    return itemArray;
  }
}
