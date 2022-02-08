import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { codes } from 'currency-codes';
import { MatDialogRef } from '@angular/material/dialog';
import { PayementService } from 'src/app/unicodePayment/payement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../_services/dialog.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import {ROLES} from '../common/roles';

declare var RazorPay: any;

@Component({
    selector: 'app-razor-payment',
    templateUrl: './razor-payment.component.html',
    styleUrls: ['./razor-payment.component.css'],
})
export class RazorPaymentComponent {
    currencyCodes: any;
    razorPayForm: FormGroup;
    cardHandler = this.onChange.bind(this);
    cardError: string;
    submitted = false;

    razorPayOptions = {
        "key": '',
        "amount": '',
        "currency": "",
        "name": '',
        "description": "",
        "order_id": '',
        "handler": (res) => {
        }
    };

    constructor(
        private dialogRef: MatDialogRef<RazorPaymentComponent>,
        private cd: ChangeDetectorRef,
        private paymentService: PayementService,
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private dialogService: DialogService,
        private authService: AuthenticationService,
        private userService :UserService
    ) {
    }

    ngOnInit(): void {
        this.razorPayForm = this.formBuilder.group({
            email: [''],
            name: [''],
            amount: [''],
            currency: ['']
        });

        this.currencyCodes = codes();
    }
    createOrder() {
        this.paymentService.razorPayOrder(this.razorPayForm.value).subscribe((res) => {
            this.ngZone.run(() => {
                this.dialogRef.close();
              });

            this.razorPayOptions.key = res['key'];
            this.razorPayOptions.amount = res['value']['amount'];
            this.razorPayOptions.currency = res['value']['currency'];
            this.razorPayOptions.name = res['value']['name'];
            this.razorPayOptions.description = res['value']['description'];
            this.razorPayOptions.order_id = res['value']['order_id'];
            this.razorPayOptions.handler = this.razorPayResponseHandler.bind(this)
            var razorPayWindow = (<any>window).Razorpay(this.razorPayOptions);
            razorPayWindow.open();
        },error => {
            this.dialogService.openDialog(error.error.message, 'ERROR');
          })
    }

    razorPayResponseHandler(response) {
        if(this.authService.currentUserValue.data.user.role !== ROLES.ADMIN){
            this.authService.currentUserValue.data.user.role = ROLES.ADMIN;
            this.userService.updateUser(this.authService.currentUserValue.data.user).subscribe(data => {
                const dialogRef =  this.dialogService.openSuccessDialog('Your Payment with razor pay is successful!!', 'SUCCESS');
              }, error => {
                this.dialogService.openDialog('Error while updating user role', 'ERROR');
              });
        }else{
            const dialogRef =  this.dialogService.openSuccessDialog('Your Payment with razor pay is successful!!', 'SUCCESS');
        }
    }

    onChange({ error }) {
        if (error) {
            this.cardError = error.message;
        } else {
            this.cardError = null;
        }
        this.cd.detectChanges();
    }
}