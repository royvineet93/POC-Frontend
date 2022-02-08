import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../_services';
import {VendorService} from '../_services/vendor.service';
import {ItemService} from '../_services/item.service';
import {DialogService} from '../_services/dialog.service';
import csc, { ICountry, IState, ICity } from 'country-state-city';
import { codes } from 'currency-codes';
import {MyErrorStateMatcher} from '../common/my-error-state-matcher';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {

  CVForm: FormGroup;
  menuName = 'contactDetailsTab';
  service: string;
  data: any;
  clientSer = false;
  vendorSer = false;
  itemSer = false;
  isDataAvailable = false;
  matcher = new MyErrorStateMatcher();
  shippingAdd = false;
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
  countryCodes: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private clientService: ClientService,
              private vendorService: VendorService,
              private itemService: ItemService,
              private dialogService: DialogService) {
    this.countries = csc.getAllCountries();
    this.countryCodes = codes();
  }

  checkServiceName(): void {
    if (this.service === 'itemService') {
      this.itemSer = true;
    }
    if (this.service === 'vendorService') {
      this.vendorSer = true;
    }
    if (this.service === 'clientService') {
      this.clientSer = true;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.service = params.service;
      if (params.data) {
        this.data = JSON.parse(params.data);
        this.isDataAvailable = true;
      }
      this.checkServiceName();
    });
    this.initializeForm();
  }

  initializeForm() {
    this.CVForm = this.formBuilder.group({
      companyName: [this.isDataAvailable ? this.data.companyName : '', Validators.required],
      phone: [this.isDataAvailable ? this.data.phone : '', Validators.required],
      email: [this.isDataAvailable ? this.data.email : '', Validators.required],
      gstin: [this.isDataAvailable ? this.data.gstin : ''],
      pan: [this.isDataAvailable ? this.data.pan : '', Validators.required],
      tin: [this.isDataAvailable ? this.data.tin : ''],
      vat: [this.isDataAvailable ? this.data.vat : ''],
      website: [this.isDataAvailable ? this.data.website : ''],
      currency: [this.isDataAvailable ? this.data.currency : '', Validators.required],
      contactName: [this.isDataAvailable ? this.data.contactDetails.contactName : ''],
      contactEmail: [this.isDataAvailable ? this.data.contactDetails.contactEmail : ''],
      contactPhone: [this.isDataAvailable ? this.data.contactDetails.contactPhone : ''],
      billAdd: [this.isDataAvailable ? this.data.billingAddress.address : ''],
      billCountry: [this.isDataAvailable ? this.data.billingAddress.country : ''],
      billState: [this.isDataAvailable ? this.data.billingAddress.state : ''],
      billCity: [this.isDataAvailable ? this.data.billingAddress.city : ''],
      billPincode: [this.isDataAvailable ? this.data.billingAddress.pincode : ''],
      shipAdd: [this.isDataAvailable ? this.data.shippingAddress.address : ''],
      shipCountry: [this.isDataAvailable ? this.data.shippingAddress.country : ''],
      shipState: [this.isDataAvailable ? this.data.shippingAddress.state : ''],
      shipCity: [this.isDataAvailable ? this.data.shippingAddress.city : ''],
      shipPincode: [this.isDataAvailable ? this.data.shippingAddress.pincode : ''],
      facebook: [this.isDataAvailable ? this.data.otherInfo.facebook : ''],
      lst: [this.isDataAvailable ? this.data.otherInfo.lst : null],
      cst: [this.isDataAvailable ? this.data.otherInfo.cst : null],
      serviceTax: [this.isDataAvailable ? this.data.otherInfo.serviceTax : null],
      notes: [this.isDataAvailable ? this.data.notes : ''],
      id: [this.isDataAvailable ? this.data.id : '']
    });
  }

  get contactDetails(): FormArray {
    return <FormArray>this.CVForm.get('contactDetails');
  }

  createContactDetails(contactDetails): FormGroup {
    if (contactDetails) {
      return this.formBuilder.group({
        contactName: [contactDetails.contactName],
        contactPhone: [contactDetails.contactPhone],
        contactEmail: [contactDetails.contactEmail]
      });
    }
    return this.formBuilder.group({
      contactName: '',
      contactPhone: '',
      contactEmail: ''
    });
  }

  get billingAddress(): FormArray {
    return <FormArray>this.CVForm.get('billingAddress');
  }

  get otherInfo(): FormArray {
    return <FormArray>this.CVForm.get('otherInfo');
  }

  get shippingAddress(): FormArray {
    return <FormArray>this.CVForm.get('shippingAddress');
  }

  createAddress(address): FormGroup {
    if (address) {
      const add = address.split(' ');
      console.log('data is present');
      return this.formBuilder.group({
        address: [add[0].split('\n')[0]],
        country: ['p'],
        city: [add[0].split('\n')[1]],
        state: [add[1]],
        pincode: [add[2]]
      });
    }
    return this.formBuilder.group({
      address: [''],
      country: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }

  addContactDetails(): void {
    this.contactDetails.push(this.createContactDetails(''));
  }

  onSubmit() {
    this.CVForm.markAllAsTouched();
    if (this.CVForm.invalid) {
      return;
    }
    if (this.CVForm.value.id) {
      if (this.vendorSer) {
        this.vendorService.updateVendor(this.vendorService.transformVendorObj(this.CVForm.value, this.data.id)).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Vendor updated successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }

      if (this.clientSer) {
        this.clientService.updateClient(this.clientService.transformClientObj(this.CVForm.value, this.data.id)).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Client updated successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }
    } else {
      if (this.vendorSer) {
        const obj = this.vendorService.transformVendorObj(this.CVForm.value, '');
        delete obj._id;
        this.vendorService.saveVendor(obj).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Vendor saved successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
        ;
      }
      if (this.clientSer) {
        const obj = this.clientService.transformClientObj(this.CVForm.value, '')
        delete obj._id;
        this.clientService.saveClient(obj).subscribe(data => {
          const dialogRef = this.dialogService.openSuccessDialog('Client saved successfully', 'SUCCESS');
          dialogRef.afterClosed().subscribe(result => {
            this.redirect();
          });
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }
    }
  }

  menuClicked(e) {
    this.menuName = e.target.className;
  }

  redirect() {
    if (this.itemSer) {
      this.router.navigate(['items']);
    }

    if (this.vendorSer) {
      this.router.navigate(['vendors']);
    }

    if (this.clientSer) {
      this.router.navigate(['clients']);
    }
  }

  addShippingAddress() {
    this.shippingAdd = true;
  }

  onChangeCountry(countryId: string) {
    this.cities = null;
    if (countryId) {
      this.states = csc.getStatesOfCountry(countryId);
    } else {
      this.states = null;
    }
  }

  onChangeState(stateId: string) {
    if (stateId) {
      this.cities = csc.getCitiesOfState(stateId);
    } else {
      this.cities = null;
    }
  }
}
