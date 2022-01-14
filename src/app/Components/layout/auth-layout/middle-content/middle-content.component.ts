import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services';



@Component({
  selector: 'auth-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.css']
})
export class MiddleContentComponent implements OnInit {
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
