import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { DialogService } from 'src/app/_services/dialog.service';
import { ItemService } from '../../_services/item.service';
import { codes } from 'currency-codes';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  selectedTab: number;
  data: any;
  isEdit: boolean;
  productCharaters = '';
  serviceCharaters = '';
  countryCodes: any;
  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private dialogService: DialogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.countryCodes = codes();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.data) {
        this.data = JSON.parse(params.data);
        this.isEdit = true;
      }
    });
    this.initializeForm();
    this.setTabIndex(this.data);
  }

  setTabIndex(data: any) {
    this.selectedTab = this.data ? (this.data.itemType === 'PRODUCT' ? 0 : 1) : 0;
  }

  initializeForm() {
    const isProduct = this.data ? (this.data.itemType === 'PRODUCT' ? true : false) : false;
    const isEdit = this.data ? true : false;
    if (isEdit) {
      this.productCharaters = isProduct ? this.data.description : '';
      this.serviceCharaters = !isProduct ? this.data.description : '';
    }
    this.itemForm = this.formBuilder.group({
      productName: [isEdit ? (isProduct ? this.data.name : '') : '', Validators.required],
      productItemCode: [isEdit ? (isProduct ? this.data.itemCode : '') : '', Validators.required],
      productDescription: [isEdit ? (isProduct ? this.data.description : '') : ''],
      productUnitPice: [isEdit ? (isProduct ? this.data.salesInfo.unitPrice : '') : ''],
      productCurrency: [isEdit ? (isProduct ? this.data.salesInfo.currency : '') : ''],
      productCessPercent: [isEdit ? (isProduct ? this.data.salesInfo.cessPercent : '') : ''],
      productCess: [isEdit ? (isProduct ? this.data.salesInfo.cess : '') : ''],
      quantity: [isEdit ? (isProduct ? this.data.quantity : '') : '', Validators.required],
      productUnit: [isEdit ? (isProduct ? this.data.unit : '') : '', Validators.required],
      productTax: [isEdit ? (isProduct ? this.data.tax : '') : ''],
      hsn: [isEdit ? (isProduct ? this.data.HSN : '') : ''],
      productPurchaseUnitPice: [isEdit ? (isProduct ? this.data.purchaseInfo.unitPrice : '') : ''],
      productPurchaseCurrency: [isEdit ? (isProduct ? this.data.purchaseInfo.currency : '') : ''],
      productPurchaseCessPercent: [isEdit ? (isProduct ? this.data.purchaseInfo.cessPercent : '') : ''],
      productPurchaseCess: [isEdit ? (isProduct ? this.data.purchaseInfo.cess : '') : ''],

      serviceName: [isEdit ? (!isProduct ? this.data.name : '') : '', Validators.required],
      serviceItemCode: [isEdit ? (isProduct ? this.data.itemCode : '') : '', Validators.required],
      serviceDescription: [isEdit ? (!isProduct ? this.data.description : '') : ''],
      serviceUnitPice: [isEdit ? (!isProduct ? this.data.salesInfo.unitPrice : '') : ''],
      serviceCurrency: [isEdit ? (!isProduct ? this.data.salesInfo.currency : '') : ''],
      servicetCessPercent: [isEdit ? (!isProduct ? this.data.salesInfo.cessPercent : '') : ''],
      serviceCess: [isEdit ? (!isProduct ? this.data.salesInfo.cess : '') : ''],
      serviceUnit: [isEdit ? (!isProduct ? this.data.unit : '') : '', Validators.required],
      serviceTax: [isEdit ? (!isProduct ? this.data.tax : '') : ''],
      sac: [isEdit ? (!isProduct ? this.data.sac : '') : ''],
      servicePurchaseUnitPice: [isEdit ? (!isProduct ? this.data.purchaseInfo.unitPrice : '') : ''],
      servicePurchaseCurrency: [isEdit ? (!isProduct ? this.data.purchaseInfo.currency : '') : ''],
      servicePurchaseCessPercent: [isEdit ? (!isProduct ? this.data.purchaseInfo.cessPercent : '') : ''],
      servicePurchaseCess: [isEdit ? (!isProduct ? this.data.purchaseInfo.cess : '') : '']

    });
  }

  removeRequiredValidators() {
    if (this.selectedTab == 1) {
      this.itemForm.removeControl('productName');
      this.itemForm.removeControl('quantity');
      this.itemForm.removeControl('productUnit');
    } else {
      this.itemForm.removeControl('serviceName');
      this.itemForm.removeControl('serviceUnit');
    }
  }

  onSubmit() {
    this.itemForm.markAllAsTouched();
    this.removeRequiredValidators();

    if (this.itemForm.invalid) {
      return false;
    }

    if (this.data) {
      if (this.selectedTab !== 1) {
        this.itemService.updateItem(this.transformProductData(this.itemForm.value)).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Item updated successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      } else {
        this.itemService.updateItem(this.transformServiceData(this.itemForm.value)).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Item updated successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }
    } else {
      if (this.selectedTab !== 1) {
        const productdata = this.transformProductData(this.itemForm.value);
        delete productdata._id;
        this.itemService.saveItem(productdata).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Item created successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      } else {
        const serviceData = this.transformServiceData(this.itemForm.value);
        delete serviceData._id;
        this.itemService.saveItem(serviceData).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Item created successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }
    }

  }

  transformProductData(data: any): any {

    const salesInfo: any = {
      unitPrice: data.productUnitPice,
      currency: data.productCurrency,
      cessPercent: data.productCessPercent,
      cess: data.productCess
    }
    const purchaseInfo: any = {
      unitPrice: data.productPurchaseUnitPice,
      currency: data.productPurchaseCurrency,
      cessPercent: data.productPurchaseCessPercent,
      cess: data.productPurchaseCess
    }
    const product: any = {
      itemType: 'PRODUCT',
      itemCode: data.itemCode,
      name: data.productName,
      description: data.productDescription,
      salesInfo: salesInfo,
      purchaseInfo: purchaseInfo,
      quantity: data.quantity,
      unit: data.productUnit,
      tax: data.productTax,
      HSN: data.hsn,
      _id: this.data ? this.data.id : ''
    };

    return product;
  }

  transformServiceData(data: any): any {

    const salesInfo: any = {
      unitPrice: data.serviceUnitPice,
      currency: data.serviceCurrency,
      cessPercent: data.servicetCessPercent,
      cess: data.serviceCess
    }
    const purchaseInfo: any = {
      unitPrice: data.servicePurchaseUnitPice,
      currency: data.servicePurchaseCurrency,
      cessPercent: data.servicePurchaseCessPercent,
      cess: data.servicePurchaseCess
    }
    const service: any = {
      itemType: 'SERVICE',
      itemCode: data.itemCode,
      name: data.serviceName,
      description: data.serviceDescription,
      salesInfo: salesInfo,
      purchaseInfo: purchaseInfo,
      unit: data.serviceUnit,
      tax: data.serviceTax,
      SAC: data.sac,
      _id: this.data ? this.data.id : ''
    };

    return service;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

  redirect() {
    this.router.navigate(['items']);
  }
}
