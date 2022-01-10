import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn=false;
  workloader?:string;
  constructor(   private accountService: SessionService) {
    const user = this.accountService.userValue;
    this.isLoggedIn = user && user.token;
   }

  ngOnInit(): void {
    
  }

}
