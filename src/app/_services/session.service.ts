import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userSubject$: BehaviorSubject<any>;
  public user$: Observable<any>;
  public filterworkLoad$: BehaviorSubject<any>;
  public filterwork$: Observable<any>;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService) {
      this.userSubject$ = new BehaviorSubject<any>(this.getSessionObject('user'));
      this.user$ = this.userSubject$.asObservable();
      
      this.filterworkLoad$ = new BehaviorSubject<any>(this.getSessionObject('user'));
      this.filterwork$ = this.filterworkLoad$.asObservable();
  }

 
  getSessionItem(key: any) {
    return localStorage.getItem(key);
  }

  public get userValue(): any {
    return this.userSubject$.value;
  }

  public get filterValue(): any {
    return this.filterworkLoad$.value;
  }
  setSessionObject(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getSessionObject(key: any) {
    return JSON.parse(localStorage.getItem(key)|| '{}');
  }

  setSessionItem(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  removeSessionItem(key: any) {
    localStorage.removeItem(key);
  }

  clearSession() {
    localStorage.clear();
  }
  userSession(value: any) {
    this.userSubject$.next(value);
  }
 
  scrollToTop() {
    // window.scrollTo(0, 0);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
