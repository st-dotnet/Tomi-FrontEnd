import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '@app/_services';

import { UserService } from '@app/_services';
// import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const user = this.userService.currentUserValue;
    // if (user) {
    //   // authorised so return true
    //   return true;
    // }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}


