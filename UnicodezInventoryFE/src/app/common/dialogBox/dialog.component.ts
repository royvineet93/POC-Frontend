import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AuthenticationService} from '../../_services';
import { InvoiceService} from '../../_services/invoice.service';
import {NotificationService} from '../../_services/notification.service';


@Component({
  selector: 'dialog-box',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  message: string;
  type: string;
  service:string;
  email = this.authenticationService.currentUserValue.data.user.email;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private ngZone: NgZone,
              private invoiceService:InvoiceService,
              private notification:NotificationService,
              private authenticationService: AuthenticationService) {
              this.message = data.message;
              this.type = data.type;
              this.service = data.service;
  } 

  close() {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });

    if (this.message === 'jwt expired') {
      this.authenticationService.logout();
    }
  }

  onConfirmClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(true);
    });
  }

  onConfirmExport(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(true);
    });
  }

  onConfirmImport(): void {
    
    this.ngZone.run(() => {
      this.dialogRef.close(true);
    });
  }

  downloadSampleReport():void{
      const service = this.service.split('S')[0];
      this.invoiceService.exportReport(service)
      .subscribe(res=>{
        let binaryData = [];
        binaryData.push(res);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: 'csv'}));
        downloadLink.setAttribute('download',`${service}.xlsx`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.notification.showSuccess('Please check your email for Reports','Success')
      } );
  }
}
