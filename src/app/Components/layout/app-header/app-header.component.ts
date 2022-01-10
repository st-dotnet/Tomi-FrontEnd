import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  isLoggedIn=false;
  constructor(   private accountService: SessionService) {
    debugger;
    const user = this.accountService.userValue;
    if( user && user.token){
      this.isLoggedIn=true;
    }
   }
  ngOnInit(): void {
  }

}
