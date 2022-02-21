import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/_models";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from ".";

@Injectable({ providedIn: 'root' })
export class reportOptionLoadingServices
{
  showError(id: any) {
    throw new Error('Method not implemented.');
  }
    private readonly reportOptionLoadingServicesEndPoint= 'ReportOption/';
    private currentUserSubject!: BehaviorSubject<User>;
    public currentUser!: Observable<User>;
   

    constructor(
    private http: HttpClient,
    private sessionService:SessionService,
    private router:Router
    )
    {
        this.currentUserSubject = new BehaviorSubject<User>(new User());
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
      }

      getCodeNotFoundInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetCodeNotFoundAsync`);
      };
      
      getLabelDetailsInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetLabelDetailsAsync`);
      };
    //   autoProcessing() {
    //     return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetAdjustmentInfoAsync`);
    //   };
    //   showError(id:any) {
    //     return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}showErrorProcess/${id}`);
    //   };
    //   downloadInformation(){
    //     return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetInfoLoadListAsync`);
    //   };
}