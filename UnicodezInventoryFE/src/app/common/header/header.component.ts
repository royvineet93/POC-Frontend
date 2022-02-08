import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { Router } from '@angular/router';
import { RazorPaymentComponent } from 'src/app/unicodePayment/razor-payment.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstname: string;
  lastname: string;
  constructor(private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.firstname = this.authService.currentUserValue.data.user.firstName;
    this.lastname = this.authService.currentUserValue.data.user.lastName;
  }

  openPayementWindow() {
     this.dialog.open(RazorPaymentComponent);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  hideSideBar() {
    const sidebar = document.getElementById('sidebarMain');

    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'inline-block';
    } else {
      sidebar.style.display = 'none';
    }
  }
}
