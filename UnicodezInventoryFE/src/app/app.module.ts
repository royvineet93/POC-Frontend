import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import {AppComponent} from "./app.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotconfirmationComponent } from './forgotconfirmation/forgotconfirmation.component';
import {EncrDecrService} from "./_services";
import { DialogService  } from './_services/dialog.service';
import { HeaderComponent } from "./common/header";
import { AuthInterceptor } from "./common/helpers";
import { GlobalErrorHandler } from "./common";
import { DialogComponent } from "./common/dialogBox";
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './common/sidebar';
import { ClientsComponent } from './clients/clients.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ItemsComponent } from './items/items.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TableComponentComponent } from './common/table-component/table-component.component';
import { ReportsComponent } from './reports/reports.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {ToastrModule} from 'ngx-toastr';
import { RazorPaymentComponent } from './unicodePayment/razor-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NoPageFoundComponent,
    DashboardComponent,
    ConfirmationComponent,
    ForgotpasswordComponent,
    ForgotconfirmationComponent,
    HeaderComponent,
    DialogComponent,
    SidebarComponent,
    ClientsComponent,
    VendorsComponent,
    ItemsComponent,
    InvoicesComponent,
    AddFormComponent,
    TableComponentComponent,
    ReportsComponent,
    AddItemComponent,
    AddInvoiceComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    RazorPaymentComponent
  ],
  imports: [
    FlexLayoutModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '683728411190-oplribh2dklc547g688j8rk0npf879pf.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    EncrDecrService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
