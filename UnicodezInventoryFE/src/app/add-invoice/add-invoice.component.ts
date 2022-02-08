import { Component, OnInit, ViewChild ,AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../_services';
import { Client, Item } from '../_models';
import { DialogService } from '../_services/dialog.service';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  isEdit: boolean;
  data: any;
  itemData: any;
  selectedItemData: Item[];
  clientNames: Client[];
  taxes: string[];
  units: string[];
  isDataAvailable = false;
  invoiceForm: FormGroup;
  SAC: string;
  unit: string;
  quantity: string;
  price: string;
  discount: string;
  tax: string;
  dataSource: MatTableDataSource<any>;
  name:any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private itemService: ItemService) { }
  displayedColumns: string[] = ['name', 'itemCode', 'description', 'quantity', 'unit', 'tax', 'HSN', 'SAC', 'itemType', 'action'];
  displayedHeaders: string[] = ['Item Name', 'Item Code', 'Description', 'Quantity', 'Unit', 'Tax', 'HSN', 'SAC', 'Item Type', 'Action'];
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.mode && params.mode=='view'){

      }
      if (params.data) {
        this.data = JSON.parse(params.data);
        this.isDataAvailable = true;
        this.selectedItemData = this.data.items;
        this.dataSource = new MatTableDataSource(this.transformItem(this.selectedItemData));
        this.dataSource.sort = this.sort;
      }
    });
    this.invoiceService.getClientNames().subscribe(data => {
      this.clientNames = data.data.client;
    }, error => {
      this.dialogService.openDialog(error.error.message, 'ERROR');
    });

    this.invoiceService.getTax().subscribe(data => {
      this.taxes = data.data.tax;
    }, error => {
      this.dialogService.openDialog(error.error.message, 'ERROR');
    });

    this.invoiceService.getUnit().subscribe(data => {
      this.units = data.data.unit;
    }, error => {
      this.dialogService.openDialog(error.error.message, 'ERROR');
    });

    this.itemService.getItems().subscribe(data => {
      this.itemData = data.data.item;
    }, error => {
      this.dialogService.openDialog(error.error.message, 'ERROR');
    });
    this.initializeForm();
  }

  ngAfterViewInit() {
    window.print();
    this.redirect();
  }

  initializeForm() {
    this.invoiceForm = this.formBuilder.group({
      clientName: [this.isDataAvailable ? this.data.clientName : '', Validators.required],
      invoiceNo: [this.isDataAvailable ? this.data.invoiceNo : '', Validators.required],
      invoiceDate: [this.isDataAvailable ? this.data.invoiceDate : '', Validators.required],
      dueDate: [this.isDataAvailable ? this.data.dueDate : '', Validators.required],
      PONo: [this.isDataAvailable ? this.data.PONo : ''],
      PODate: [this.isDataAvailable ? this.data.PODate : ''],
      paymentTerms: [this.isDataAvailable ? this.data.paymentTerms : ''],
      termsAndConditions: [this.isDataAvailable ? this.data.termsAndConditions : ''],
      privacyNotes: [this.isDataAvailable ? this.data.privacyNotes : ''],
      itemDescription: [this.isDataAvailable ? this.data.description : ''],
      sac: [this.isDataAvailable ? this.data.sac : ''],
      quantity: [this.isDataAvailable ? this.data.quantity : ''],
      price: [this.isDataAvailable ? this.data.quantity : ''],
      itemUnit: [this.isDataAvailable ? this.data.unit : ''],
      discount: [this.isDataAvailable ? this.data.quantity : ''],
      itemTax: [this.isDataAvailable ? this.data.tax : ''],
      currentItem: [''],
      id: [this.isDataAvailable ? this.data.id : '']
    });
  }

  redirect() {
    this.router.navigate(['invoices']);
  }

  onSubmit() {
    if (this.invoiceForm.invalid) {
      return;
    }
    if (this.invoiceForm.value.id) {
      this.invoiceService.updateInvoice(this.invoiceService.transformInvoiceObj(this.invoiceForm.value, this.data.id, this.selectedItemData)).subscribe(data => {
        const dialogRef = this.dialogService.openSuccessDialog('Invoice updated successfully', 'SUCCESS');
        dialogRef.afterClosed().subscribe(result => {
          this.redirect();
        });
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    } else {
      const obj = this.invoiceService.transformInvoiceObj(this.invoiceForm.value, '', this.selectedItemData);
      delete obj._id;
      this.invoiceService.saveInvoice(obj).subscribe(data => {
        const dialogRef = this.dialogService.openSuccessDialog('Invoice added successfully', 'SUCCESS');
        dialogRef.afterClosed().subscribe(result => {
          this.redirect();
        });
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    }
  }

  updateValue(value: string ,index:any,type:string) {
    var itemData :any= this.selectedItemData[index];
     if(type=='name'){
        itemData.name = value;
     }else if(type=='itemcode'){
      itemData.itemcode = value;
     }else if(type=='HSN'){
      itemData.HSN = value;
     }else if(type=='description'){
      itemData.description = value;
     }else if(type=='quantity'){
      itemData.quantity = value;
     }else if(type=='unit'){
      itemData.unit = value;
     }else if(type=='tax'){
      itemData.tax = value;
     }else if(type=='SAC'){
      itemData.SAC = value;
     }else if(type=='itemType'){
      itemData.itemType = value;
     }
	}
  setItem(event) {
    this.itemData.forEach((element, index) => {
      if (event.value === element._id) {
        var item = this.itemData[index];
        this.invoiceForm.controls['itemDescription'].setValue(item.description);
        this.invoiceForm.controls['sac'].setValue(item.sac);
        this.invoiceForm.controls['quantity'].setValue(item.quantity);
        this.invoiceForm.controls['price'].setValue('42.15');
        this.invoiceForm.controls['itemUnit'].setValue(item.unit);
        this.invoiceForm.controls['discount'].setValue('50');
        this.invoiceForm.controls['itemTax'].setValue(item.tax.toString());
      }
    });
  }

  updateAndPublishItem() {
    var itemId = this.invoiceForm.controls['currentItem'].value;
    var item;
    this.itemData.forEach((element, index) => {
      if (itemId === element._id) {
        item = this.itemData[index];
        item['description'] = this.invoiceForm.controls['itemDescription'].value;
        item['sac'] = this.invoiceForm.controls['sac'].value;
        item['quantity'] = this.invoiceForm.controls['quantity'].value;
        //item['price'] = this.invoiceForm.controls['price'].value;
        item['unit'] = this.invoiceForm.controls['itemUnit'].value;
        // item['discount'] = this.invoiceForm.controls['discount'].value;
        item['tax'] = this.invoiceForm.controls['itemTax'].value;
        if (this.selectedItemData) {
          var isPushRequired = true
          this.selectedItemData.forEach((element, index) => {
            if (itemId === element._id) {
              element = item;
              isPushRequired = false;
            }
          });
          if (isPushRequired) {
            this.selectedItemData.push(item);
          }

        } else {
          this.selectedItemData = [];
          this.selectedItemData.push(item);
        }
      }
    });

    this.dataSource = new MatTableDataSource(this.transformItem(this.selectedItemData));
    this.dataSource.sort = this.sort;
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
        "edit":false,
        "id": item._id
      };
      itemArray.push(itemObject);
    }
    return itemArray;
  }

  updateLocalItems(element: any) {
    element.edit = true;
  }

  saveItem(element: any){
    element.edit = false;
    this.dataSource = new MatTableDataSource(this.transformItem(this.selectedItemData));
    this.dataSource.sort = this.sort;
  }

  deleteLocalItems(element: any) {
    const removeIndex = this.selectedItemData.map(function (item) { return item._id; }).indexOf(element.id);
    this.selectedItemData.splice(removeIndex, 1);
    this.dataSource = new MatTableDataSource(this.transformItem(this.selectedItemData));
    this.dataSource.sort = this.sort;
  }

}
