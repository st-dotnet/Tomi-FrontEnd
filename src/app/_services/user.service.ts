﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Master, Sales, User, WorkLoad } from '@app/_models';
import { SessionService } from '.';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly customerEndPoint = 'Customer/';
  private readonly storeEndPoint = 'Store/';
  private readonly userEndPoint = 'User/';
  private _stockList: BehaviorSubject<Master[]> = new BehaviorSubject<Master[]>([]);
  public stockList: Observable<Master[]> = this._stockList.asObservable();

  private _saleList: BehaviorSubject<Sales[]> = new BehaviorSubject<Sales[]>([]);
  public saleList: Observable<Sales[]> = this._saleList.asObservable();

  private _masterList: BehaviorSubject<Master[]> = new BehaviorSubject<Master[]>([]);
  public masterList: Observable<Master[]> = this._masterList.asObservable();
  // private _customerId: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // public customerId: Observable<any> = this._customerId.asObservable();
  private _customerId = new BehaviorSubject<any>('');
  customerId = this._customerId.asObservable();
  private _storeId: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public storeId: Observable<any> = this._storeId.asObservable();

  private _stockDate: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public stockDate: Observable<any> = this._stockDate.asObservable();

  private _masterfileUplaod = new BehaviorSubject<boolean>(false);
  masterfileUplaod = this._masterfileUplaod.asObservable();

  private _stockfileUplaod = new BehaviorSubject<boolean>(false);
  stockfileUplaod = this._stockfileUplaod.asObservable();

  private _salefileUpload = new BehaviorSubject<boolean>(false);
  salefileUpload = this._salefileUpload.asObservable();

  constructor(private http: HttpClient,
    private sessionService: SessionService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.userEndPoint}authenticate`, model)
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

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.router.navigate(["/"])
    // this.router.navigate([""]).then(() => {
    //     window.location.reload();
    //   });
  }

  getAllStoreByCustomerId(customerId: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.storeEndPoint}GetStore/${customerId}`);
  }


  getAllUserByCustomerId(customerId: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.customerEndPoint}GetUsersById/${customerId}`);
  }


  addCustomer(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.customerEndPoint}AddCustomer`, model);
  };

  getCustomerList() {
    return this.http.get<any>(`${environment.apiUrl}${this.customerEndPoint}GetCustomerList`);
  }

  addUser(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.userEndPoint}AddUser`, model);
  };

  addStore(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}AddStore`, model);
  };

  uploadStockFile(model: any) {

    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportStockFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getstockData(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetStocksData`, model).subscribe(res => {
      this._stockList.next(res);
    })
  }

  uploadMasterFile(model: any) {

    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportMasterFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getMasterData(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetMasterData`, model).subscribe(res => {
      debugger;
      this._masterList.next(res);

    })
  }
  getMasterList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetMasterData`, model);
  }

  uploadSalesFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportSalesFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getSalesData(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetSalesData`, model).subscribe(res => {
      this._saleList.next(res);

    })
  }
  getSalesList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetSalesData`, model);
  }
  getStockList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetStocksData`, model);
  }

  setCustomerId(object: any) {
    this._customerId.next(object);
  }

  setStoreId(object: any) {
    this._storeId.next(object);
  }

  setStockDate(object: any) {
    this._stockDate.next(object);
  }
  setMasterfileUplaod(object: boolean) {
    this._masterfileUplaod.next(object);
  }

  setSalefileUpload(object: boolean) {
    this._salefileUpload.next(object);
  }

  setStockUpload(object: boolean) {
    this._stockfileUplaod.next(object);
  }
}