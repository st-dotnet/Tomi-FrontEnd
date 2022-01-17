import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services/session.service';

@Component({
  selector: 'auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.css']
})
export class AuthFooterComponent implements OnInit {

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
