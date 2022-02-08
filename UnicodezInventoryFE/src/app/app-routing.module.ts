import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {ForgotconfirmationComponent} from './forgotconfirmation/forgotconfirmation.component';
import {AuthGuardService, AuthGuardLoginService} from './_services';
import {ClientsComponent} from './clients/clients.component';
import {VendorsComponent} from './vendors/vendors.component';
import {ItemsComponent} from './items/items.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {AddFormComponent} from './add-form/add-form.component';
import {ReportsComponent} from './reports/reports.component';
import {AddItemComponent} from './items/add-item/add-item.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import {TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , canActivate: [AuthGuardLoginService] },
  { path: 'signup', component: SignupComponent , canActivate: [AuthGuardLoginService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService] },
  { path: 'vendors', component: VendorsComponent, canActivate: [AuthGuardService] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuardService] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuardService] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService] },
  { path: 'addForm', component: AddFormComponent, canActivate: [AuthGuardService] },
  { path: 'addItem', component: AddItemComponent, canActivate: [AuthGuardService] },
  { path: 'addInvoice', component: AddInvoiceComponent, canActivate: [AuthGuardService] },
  { path: 'confirm', component: ConfirmationComponent , canActivate: [AuthGuardLoginService] },
  { path: 'forgotpassword', component: ForgotpasswordComponent , canActivate: [AuthGuardLoginService] },
  { path: 'confirmForgotpassword', component: ForgotconfirmationComponent , canActivate: [AuthGuardLoginService] },
  { path: 'termsAndCondition', component: TermsAndConditionComponent , canActivate: [AuthGuardLoginService] },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent , canActivate: [AuthGuardLoginService] },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
