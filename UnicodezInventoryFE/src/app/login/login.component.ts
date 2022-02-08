import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService, EncrDecrService  } from '../_services';
import { DialogService  } from '../_services/dialog.service';
import { User, Profile } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: SocialUser;
  submitted = false;

  constructor(private socialAuthService: SocialAuthService,
              private authService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private encrDecrService: EncrDecrService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  transformUser(socialUser: SocialUser): any {

    const user: User = {
      email: socialUser.email,
      role: 'admin',
      firstName: socialUser.firstName,
      lastName: socialUser.lastName,
      provider: socialUser.provider
    };
    return {
      user: user,
      profile: new Profile()
    };
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser) => {
      if (socialUser) {
        this.authService.gmailLogin(socialUser.email, socialUser.provider, socialUser.firstName, socialUser.lastName)
          .pipe(first())
          .subscribe(
            data => {
              this.authService.loginAsSocialUser(data);
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.dialogService.openDialog(error.error.message, 'ERROR');
            });
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    const pwd = this.encrDecrService.encryptPassword(this.loginForm.controls.password.value);
    this.authService.login(this.loginForm.controls.email.value, pwd)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
  }
}
