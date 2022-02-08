import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../common';
import { User } from '../_models';
const userApi = '/users';
@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    signUpUser(user: User) {
        return this.http.post(baseUrl + userApi + '/signup', user);
    }

    updateUser (user: User){
        return this.http.put(baseUrl + userApi + '/updateCurrentUser', user);
    }

}