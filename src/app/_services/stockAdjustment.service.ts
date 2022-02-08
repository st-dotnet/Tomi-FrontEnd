import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Master, Sales, User, WorkLoad } from '@app/_models';
import { SessionService } from '.';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StockAdjustmentService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly StockAdjustmentEndPoint = 'StockAdjustment/';
  private readonly rangeEndPoint = 'Ranges/';
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
  recycleAdjustment(id:any){
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}ChangeDeletedRecStatus/${id}`);
  }

  GetDeletedStockAdjustment(){
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}GetDeletedRecord`);
  }
  getStoreBySku(sku: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}MasterDataBySku/${sku}`);
  }
  getStoreByBarCode(sku: string) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}MasterDataByBarCode/${sku}`);
  }

  gotoRecordId(id:any) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}GoToRecord/${id}`);
  };

  searchRecord(model:any){
    return this.http.post<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}SearchStockAdjustment`, model);
  }
  VoidTag(model:any){
    return this.http.post<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}VoidTag`, model);
  }
  getAdjustmentByCustomerId(custid:any) {
    return this.http.get<any>(`${environment.apiUrl}${this.StockAdjustmentEndPoint}GetMasterByCustomerId/${custid}`);
  };

  getTagValue(tagValue:any){
    return this.http.get<any>(`${environment.apiUrl}${this.rangeEndPoint}GetTagValue/${tagValue}`);
  }
  //
}
