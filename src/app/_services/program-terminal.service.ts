import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/_models";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from ".";

@Injectable({ providedIn: 'root' })
export class generateMF1Service
{
    private readonly generateMF1LoadingServicesEndPoint= 'ProgramTerminal/';
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

      GenerateMF1Information(model:any) {
        return this.http.post<any>(`${environment.apiUrl}${this.generateMF1LoadingServicesEndPoint}GenerateMF1`,model);
      };
      
    }
    
 