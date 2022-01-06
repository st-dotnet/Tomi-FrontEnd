import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { SessionService } from '.';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private readonly customerEndPoint = 'Customer/';
    constructor(private http: HttpClient,
        private sessionService: SessionService) {
        this.currentUserSubject = new BehaviorSubject<User>(new User());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(model:any) {
        return this.http.post<any>(`${environment.apiUrl}user/authenticate`,model)
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                // this.currentUserSubject.next(user);
                if (res.token) {
                    this.sessionService.setSessionObject('user', res);
                    this.sessionService.userSession(res);
                  }
                return res;
            }));
    }


    addCustomer(model:any){
        return this.http.post<any>(`${environment.apiUrl}${this.customerEndPoint}AddCustomer`,model);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        
    }
}