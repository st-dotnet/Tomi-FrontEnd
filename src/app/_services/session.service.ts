import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService) {
    
  }

 
  getSessionItem(key: any) {
    return localStorage.getItem(key);
  }

  setSessionObject(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
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

 
  scrollToTop() {
    // window.scrollTo(0, 0);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
