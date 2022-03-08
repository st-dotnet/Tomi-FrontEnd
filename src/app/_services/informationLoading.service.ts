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
    }
    
 