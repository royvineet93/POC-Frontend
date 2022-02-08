import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import {DialogService} from './dialogBox';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
    ) { }
    //private dialogService: DialogService

  handleError(error: Error | HttpErrorResponse) {
    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
     
    } else {
      
    }
  }
}