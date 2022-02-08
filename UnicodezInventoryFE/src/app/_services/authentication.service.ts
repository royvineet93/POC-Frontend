import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { baseUrl } from '../common';
import {Router} from "@angular/router";
const userApi = '/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
                private router : Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(baseUrl + userApi + '/login', { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

  gmailLogin(email, provider, firstName, lastName) {
    return this.http.post<any>(baseUrl + userApi + '/login', { email, provider, firstName, lastName })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

    loginAsSocialUser(user: User): User {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }

    resetPassword(email) {
        return this.http.post<any>(baseUrl + userApi + '/forgotPassword', { email }).pipe();
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
        this.currentUserSubject.next(null);
    }

    public isAuthenticated(): boolean {
        const user = localStorage.getItem('currentUser');
        return (user != null);
    }
}
