import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  isLoggedIn=false;
  constructor(   private accountService: SessionService) {
    
    const user = this.accountService.userValue;
    if( user && user.token){
      this.isLoggedIn=true;
    }
   }
  ngOnInit(): void {
  }


}
