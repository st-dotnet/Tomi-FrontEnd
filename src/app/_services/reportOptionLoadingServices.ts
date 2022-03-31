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
      
      getLabelDetailsInformation(model:any,tagto:any) {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetLabelDetailsAsync/${model}/${tagto}`);
      };

      getExtendedPricesInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetExtendedPricesAsync`);
      };

      getUncountedItemsInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetUncountedItemsAsync`);
      };
      getVariationBySKUInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetVariationBySKUAsync`);
      };
    
      getCorrectionsReportInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetCorrectionsReportAsync`);
      };

      getBreakDownReportInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetBreakDownReportAsync`);
      };
      getCheckDateTimeInformation() {
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetDateTimeCheckReport`);
      };
      getInventoryFigureReport(model: any) {
        return this.http.post<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}MarbeteDetailReport`, model);
      };
      getInventoryBillingReport() {
        debugger;
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}BillingReport`);
      };
      getInventoryFigureReportCustom(model: any) 
      { 
        const url = `${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetInventoryFigureReport`;    
        return this.http.post(url, model, {    
          responseType: 'blob'    
        });    
      }
      
      getInventoryReportCustom(model: any) { 
        const url = `${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}InventoryDetailReport`;    
        return this.http.post(url, model, {    
          responseType: 'blob'    
        });    
      }

      getVoidTagDataAsync() {
      debugger;
        return this.http.get<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetVoidTagDataAsync`);
      };
      getMarbeteFigureReportCustom(model: any) { 
        const url = `${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}MarbeteDetailReport`;    
        return this.http.post(url, model, {    
          responseType: 'blob'    
        });    
      }
      getInformation(model:any) { 
        debugger;
        return this.http.post<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}GetInfoFileLoadedListAsync`, model);
      };
      OffSet(model:any) 
      { 
          debugger;
          return this.http.post<any>(`${environment.apiUrl}${this.reportOptionLoadingServicesEndPoint}SendOffsetvalue`, model);
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