import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services/session.service';

@Component({
  selector: 'auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  isLoggedIn = false;
  constructor(private accountService: SessionService) {

    const user = this.accountService.userValue;
    if (user && user.token) {
      this.isLoggedIn = true;
    }
  }
  ngOnInit(): void {
  }

}
