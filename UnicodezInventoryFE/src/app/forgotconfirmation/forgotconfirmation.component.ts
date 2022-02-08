import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgotconfirmation',
  templateUrl: './forgotconfirmation.component.html',
  styleUrls: ['./forgotconfirmation.component.css']
})
export class ForgotconfirmationComponent implements OnInit {

  email:string;

  constructor(private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

}
