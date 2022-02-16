import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { disableDebugTools } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { User } from "@app/_models";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from ".";
@Injectable({ providedIn: 'root' })
export class fileStoreService
{
    private readonly fileServicesEndPoint= 'FileStore/';
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
        getInformation(id:any,year:any) { 
            debugger;
            return this.http.get<any>(`${environment.apiUrl}${this.fileServicesEndPoint}GetInfoFileLoadedListAsync/${id}/${year}`);
        };
}