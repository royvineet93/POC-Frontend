import { Injectable } from '@angular/core';
import { Router, CanActivate} from "@angular/router";
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
