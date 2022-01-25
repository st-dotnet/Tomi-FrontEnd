import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Master, Sales, User, WorkLoad } from '@app/_models';
import { SessionService } from '.';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RangesService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly rangeEndPoint = 'Ranges/';
  private readonly groupEndPoint = 'Group/';
  private readonly StockAdjustmentEndPoint = 'StockAdjustment/';
  //StockAdjustment
  private _rangeList: BehaviorSubject<Range[]> = new BehaviorSubject<Range[]>([]);
  public rangeList: Observable<Range[]> = this._rangeList.asObservable();

  constructor(private http: HttpClient,
    private sessionService: SessionService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  addRange(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.rangeEndPoint}Addrange`, model);
  };
  getRangeList() {
    return this.http.get<any>(`${environment.apiUrl}${this.rangeEndPoint}GetRangeList`).subscribe(res => {
      this._rangeList.next(res);
    })
  }
  getRangeLists() {
    return this.http.get<any>(`${environment.apiUrl}${this.rangeEndPoint}GetRangeList`);
  }

  deleteRange(model: any) {
    return this.http.delete<any>(`${environment.apiUrl}${this.rangeEndPoint}DeleteRange/${model}`);
  };

  addGroup(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.groupEndPoint}AddGroup`, model);
  };

  getGroupLists() {
    return this.http.get<any>(`${environment.apiUrl}${this.groupEndPoint}GetGroupList`);
  }
  deleteGroup(model: any) {
    return this.http.delete<any>(`${environment.apiUrl}${this.groupEndPoint}DeleteGroup/${model}`);
  };

  SearchRange(model: any) {
    return this.http.delete<any>(`${environment.apiUrl}${this.groupEndPoint}Search`, model);
  };

  addAdjustment(model: any) {
    return this.http.post<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}AddStockAdjustment`, model);
  };
  getAdjustment() {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}GetStockAdjustmentListAsync`);
  };

  getAdjustmentById(id:any) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}GetStockAdjustmentAsync/${id}`);
  };

  deleteAdjustment(id:any){
    return this.http.delete<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}DeleteStockAdjustment/${id}`);
  }
  recycleAdjustment(model:any){
    return this.http.post<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}ChangeDeletedRecStatus`,model);
  }

  getStoreBySku(sku: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}MasterDataBySku/${sku}`);
  }
  //
}
