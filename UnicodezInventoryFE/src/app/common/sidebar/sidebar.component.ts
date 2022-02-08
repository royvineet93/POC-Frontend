import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  selectedSideBar;
  sideBarArray = [
  {name: 'Dashboard', image: 'fas fa-home', routeTo: '/dashboard'},
  {name: 'Clients', image: 'fas fa-user-tie', routeTo: '/clients'},
  {name: 'Vendors', image: 'fas fa-users', routeTo: '/vendors'},
  {name: 'Items', image: 'fas fa-dolly-flatbed', routeTo: '/items'},
  {name: 'Invoices', image: 'fas fa-file-invoice', routeTo: '/invoices'},
  {name: 'Reports', image: 'fas fa-chart-bar', routeTo: '/reports'}];
  
  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    const location = this.location.path().split('/')[1];
    this.selectedSideBar = location.charAt(0).toUpperCase() + location.slice(1);
  }

  onClick(selectedSideBar:String){
      this.selectedSideBar = selectedSideBar;
      const navigateUrl = '/'+ selectedSideBar.charAt(0).toLowerCase() + selectedSideBar.slice(1);;
      this.router.navigate([navigateUrl])
  }
}
