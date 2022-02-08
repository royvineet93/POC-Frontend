import { Injectable } from '@angular/core';
import { DialogComponent } from '../common/dialogBox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openDialog(message: string, type: string,) {
    const dialogConfig = new MatDialogConfig();
    if (message.includes('duplicate key error')) {
      message = 'Duplicate entry found in the system, please put the new detail or use the existing one';
    }
    dialogConfig.data = {
      message: message,
      type: type
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  openSuccessDialog(message: string, type: string): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: message,
        type: type
      }
    });
    return dialogRef;
  }

  openConfimationDialog(type: string): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        type: type
      }
    });

    return dialogRef;
  }

  openExportDialog(type: string): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type
      }
    });
    return dialogRef;
  }

  openImportDialog(type: string,service): any {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: type,
        service
      }
    });
    return dialogRef;
  }
}
