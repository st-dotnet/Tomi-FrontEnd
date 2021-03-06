import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Category, Department, Master, ParametersByDepartment, Reserved, Sales, Stock, User, WorkLoad } from '@app/_models';
import { SessionService } from '.';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParameterPropertyModifier } from 'typescript';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly customerEndPoint = 'Customer/';
  private readonly storeEndPoint = 'Store/';
  private readonly userEndPoint = 'User/';


  private _stockList: BehaviorSubject<Stock[]> = new BehaviorSubject<Stock[]>([]);
  public stockList: Observable<Master[]> = this._stockList.asObservable();

  private _saleList: BehaviorSubject<Sales[]> = new BehaviorSubject<Sales[]>([]);
  public saleList: Observable<Sales[]> = this._saleList.asObservable();

  private _masterList: BehaviorSubject<Master[]> = new BehaviorSubject<Master[]>([]);
  public masterList: Observable<Master[]> = this._masterList.asObservable();

  private _departmentList: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  public departmentList: Observable<Department[]> = this._departmentList.asObservable();

  private _categoryList: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public categoryList: Observable<Category[]> = this._categoryList.asObservable();

  private _reservedList: BehaviorSubject<Reserved[]> = new BehaviorSubject<Reserved[]>([]);
  public reservedList: Observable<Reserved[]> = this._reservedList.asObservable();

  private _parametersbydepartmentList: BehaviorSubject<ParametersByDepartment[]> = new BehaviorSubject<ParametersByDepartment[]>([]);
  public parametersbydepartmentList: Observable<ParametersByDepartment[]> = this._parametersbydepartmentList.asObservable();

  private _customerId = new BehaviorSubject<any>('');
  customerId = this._customerId.asObservable();

  private _storeId: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public storeId: Observable<any> = this._storeId.asObservable();
  
  private _storeName: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public storeName: Observable<any> = this._storeName.asObservable();

  private _storeAddress: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public storeAddress: Observable<any> = this._storeAddress.asObservable();

 

  private _category: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public category: Observable<any> = this._category.asObservable();

  private _activeTab: BehaviorSubject<any> = new BehaviorSubject<any>(1);
  public activeTab: Observable<any> = this._activeTab.asObservable();

  private _stockDate: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public stockDate: Observable<any> = this._stockDate.asObservable();

  private _masterfileUplaod = new BehaviorSubject<boolean>(false);
  masterfileUplaod = this._masterfileUplaod.asObservable();

  private _departmentfileUplaod = new BehaviorSubject<boolean>(false);
  departmentfileUplaod = this._departmentfileUplaod.asObservable();

  private _stockfileUplaod = new BehaviorSubject<boolean>(false);
  stockfileUplaod = this._stockfileUplaod.asObservable();

  private _salefileUpload = new BehaviorSubject<boolean>(false);
  salefileUpload = this._salefileUpload.asObservable();

    //
    private _reservedfileUpload = new BehaviorSubject<boolean>(false);
    reservedfileUpload = this._reservedfileUpload.asObservable();
    private _parametersByDepartmentfileUpload = new BehaviorSubject<boolean>(false);
    parametersByDepartmentfileUpload = this._parametersByDepartmentfileUpload.asObservable();
    private _categoriesfileUpload = new BehaviorSubject<boolean>(false);
    categoriesfileUpload = this._categoriesfileUpload.asObservable();
    //

  private _disablemasterfileupdate= new BehaviorSubject<boolean>(false);
  disablemasterfileupdate = this._disablemasterfileupdate.asObservable();

  private _disablestockfileupdate= new BehaviorSubject<boolean>(false);
  disablestockfileupdate = this._disablestockfileupdate.asObservable();

  private _disablesalefileupdate= new BehaviorSubject<boolean>(false);
  disablesalefileupdate = this._disablesalefileupdate.asObservable();

  private _disabledepartmentfileupdate= new BehaviorSubject<boolean>(false);
  disabledepartmentfileupdate = this._disabledepartmentfileupdate.asObservable();

  private _disablecategoryfileupdate= new BehaviorSubject<boolean>(false);
  disablecategoryfileupdate = this._disablecategoryfileupdate.asObservable();

  private _disablereservedfileupdate= new BehaviorSubject<boolean>(false);
  disablereservedfileupdate = this._disablereservedfileupdate.asObservable();

  private _disableparametersbydepartmentfileupdate= new BehaviorSubject<boolean>(false);
  disableparametersbydepartmentfileupdate = this._disableparametersbydepartmentfileupdate.asObservable();
 
  constructor(private http: HttpClient,
    private sessionService: SessionService,
    private router: Router,
    private spinner: NgxSpinnerService,) {
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
        this.currentUserSubject.next(res);
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

    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportNewStockFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getstockData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetNewStockData`, model).subscribe(res => {
      this._stockList.next(res);
    this.spinner.hide();
    })
  }

  uploadMasterFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportOrderJobFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getMasterData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetOrderJob`, model).subscribe(res => {
      this._masterList.next(res);
      this.spinner.hide();
    })
  }
  getMasterList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetOrderJob`, model);
  }

  uploadDepartmentFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportDepartmentFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  getDepartmentData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetDepartmentsData`, model).subscribe(res => {
      this._departmentList.next(res);
      this.spinner.hide();
    })
  }
  getDepartmentList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetDepartmentsData`, model);
  }

  getCategoryData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetCategoriesData`, model).subscribe(res => {
      this._categoryList.next(res);
      this.spinner.hide();
    })
  }
  getReservedList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetReservedData`, model);
  }

  getReservedData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetReservedData`, model).subscribe(res => {
      this._reservedList.next(res);
      this.spinner.hide();
    })
  }
  getCategoryList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetCategoriesData`, model);
  }


  uploadSalesFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportSalesFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };

  //
  uploadReservedFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportReservedFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };
  uploadParameterByDepartmentFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportParametersByDepartmentFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };
  uploadCategoriesFile(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}ImportCategoriesFile`, model, {
      reportProgress: true,
      responseType: 'json'
    });
  };
  //

  getSalesData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetSalesData`, model).subscribe(res => {
      this._saleList.next(res);
     this.spinner.hide();
    })
  }

  getSalesList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetSalesData`, model);
  }

  getParametersByDepartmentList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetParametersByDepartmentData`, model);
  }

  getParametersByDepartmentData(model: any) {
    this.spinner.show();
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetParametersByDepartmentData`, model).subscribe(res => {
      this._parametersbydepartmentList.next(res);
      this.spinner.hide();
    })
  }
  getStockList(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.storeEndPoint}GetNewStockData`, model);
  }

  setCustomerId(object: any) {
    this._customerId.next(object);
  }

  setStoreId(object: any) {
    this._storeId.next(object);
  }

  setactiveTab(object: any) {
    this._activeTab.next(object);
  }
  setStockDate(object: any) {
    this._stockDate.next(object);
  }
  setMasterfileUplaod(object: boolean) {
    this._masterfileUplaod.next(object);
  }
  setDepartmentfileUplaod(object: boolean) {
    this._departmentfileUplaod.next(object);
  }
  setSalefileUpload(object: boolean) {
    this._salefileUpload.next(object);
  }
  //
    setReservedfileUpload(object: boolean) {
      this._reservedfileUpload.next(object);
    }
    setParameterBydepartmentfileUpload(object: boolean) {
      this._parametersByDepartmentfileUpload.next(object);
    }
    setCategoriesfileUpload(object: boolean) {
      this._categoriesfileUpload.next(object);
    }
  //
 setStoreName(object: any) {
    this._storeName.next(object);
 }

 setStoreAddress(object: any) {
  this._storeAddress.next(object);
}
  setStockUpload(object: boolean) {
    this._stockfileUplaod.next(object);
  }
  setMasterfilbrowser(object: boolean) {
    this._disablemasterfileupdate.next(object);
  }
  setparameterfileUploadDisable(object: boolean) {
    this._disableparametersbydepartmentfileupdate.next(object);
  }
  setCategoryfileUploadDisable(object: boolean) {
    this._disablecategoryfileupdate.next(object);
  }

  setReservefileUploadDisable(object: boolean) {
    this._disablereservedfileupdate.next(object);
  }
  setDepartmentfilebrowser(object: boolean) {
    this._disabledepartmentfileupdate.next(object);
  }
  setSalefileUploaddisable(object: boolean) {
    this._disablesalefileupdate.next(object);
  }
  setStockfileUploaddisable(object: boolean) {
    this._disablestockfileupdate.next(object);
  }


}
