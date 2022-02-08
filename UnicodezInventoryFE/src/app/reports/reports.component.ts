import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../_services/invoice.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  subheadings =['VAT'];
  selectedHeading='VAT';
  constructor(private invoice:InvoiceService, private notification:NotificationService) { }
  ngOnInit(): void {
  }

  selectedHeadingFunc(heading){
    this.selectedHeading = heading;
  }

  export(){

  }

}
