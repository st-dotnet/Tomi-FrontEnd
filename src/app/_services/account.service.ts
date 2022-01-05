import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';



@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly authenticationEndpoint = 'authentication/';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}
  forgetPasswordEmail(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.authenticationEndpoint}sendForgotPasswordEmail`, model);
  }

  resetPassword(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.authenticationEndpoint}UpdateCustomer`, model);
  }

}



//For Preview Invoice : https://localhost:44336/api/Account/GetOrderInvoice










