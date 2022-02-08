import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService, EncrDecrService, UserService} from '../_services';
import { DialogService  } from '../_services/dialog.service';
import csc, { ICountry, IState, ICity } from 'country-state-city';
import { User, Profile } from '../_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  socialUser: SocialUser;
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
  submitted = false;
  constructor(private socialAuthService: SocialAuthService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private encrDecrService: EncrDecrService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.countries = csc.getAllCountries();
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


  transformUser(formData: any): any {
    const pwd = this.encrDecrService.encryptPassword(formData.password);
    const user: User = {
      email: formData.email,
      password: pwd,
      role: 'admin',
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    const profile: Profile = {
      companyName: formData.companyName,
      country: csc.getCountryById(formData.country).name,
      city: csc.getCityById(formData.city).name,
      state: csc.getStateById(formData.state).name,
      phone: formData.phone
    }
    const userdetails = {
      user: user,
      profile: profile
    };

    return userdetails;
  }

  transformSocialUser(socialUser: SocialUser): any {

    const user: User = {
      email: socialUser.email,
      role: 'admin',
      firstName: socialUser.firstName,
      lastName: socialUser.lastName,
      provider: socialUser.provider

    };
    const userdetails = {
      user: user,
      profile: new Profile()
    };

    return userdetails;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.userService.signUpUser(this.transformUser(this.signupForm.value))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/confirm']);
        },
        error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
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
