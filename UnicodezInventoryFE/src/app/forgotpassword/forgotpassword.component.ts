import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted=true;
    this.authService.resetPassword(this.forgotForm.controls.email.value)
      .pipe(first())
      .subscribe(
        data => {
            console.log("email for forgot password sent successfully")
          this.router.navigate(['/confirmForgotpassword'], {queryParams: {email: this.forgotForm.controls.email.value}, skipLocationChange: true});
        },
        error => {
        });
    console.log("submit successful");
  }
}
