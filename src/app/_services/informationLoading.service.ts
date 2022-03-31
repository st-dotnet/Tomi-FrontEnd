import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/_models";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from ".";

@Injectable({ providedIn: 'root' })
export class loadingformationService
{
    private readonly generateInformationLoadingEndPoint= 'InformationLoading/';
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
    public get currentUserValue(): User 
    {
        return this.currentUserSubject.value;
    }

    GenerateInformationLoading() 
    {
      debugger;
      return this.http.get<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}GenerateTerminalSummary`);
      };
    
    getTerminalSummmaryByTag(tagId:any) 
    {
      debugger;
      return this.http.get<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}ForOriginalTag/${tagId}`);
      };

    getterminalsummaryforfirstdetails(tagId:any,empNumber:any) 
      {
        debugger;
        return this.http.get<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}GetInformationfirstSectiondetails/${tagId}/${empNumber}`);
        };
    getterminalsummaryforseconddetails(tagId:any,empNumber:any) 
        {
          debugger;
          return this.http.get<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}GetInformationsecondSectiondetails/${tagId}/${empNumber}`);
          };  
    getterminalsummaryKeepOriginal(tagid:any,empNumber:any,terminal:any)
      {
        debugger;
        return this.http.delete<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}DeleteOriginalRecord/${tagid}/${empNumber}/${terminal}`);
      }
    updateTag(model:any)
      {
        debugger;
        return this.http.post<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}UpdateTag`, model);
      }
      mergeNewRecords(modelparam:any)
      {
        debugger;
        return this.http.post<any>(`${environment.apiUrl}${this.generateInformationLoadingEndPoint}MergeNewRecordWithOriginal`, modelparam);
      }
  }
 