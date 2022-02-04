import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';;

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
  reservedList: any;
  customerId: any;
  storeId: any;
  year: any;
  p: number = 1;
  diasblereservedFile: boolean= false;

  constructor(
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
  ) { 

  }

  ngOnInit(): void {
    this.authenticationService.disablereservedfileupdate.subscribe(user => this.diasblereservedFile = user);
    if(!this.diasblereservedFile)
    {
      
     this.authenticationService.reservedList.subscribe(user => this.reservedList = user);
    }
    else{
         this.authenticationService.customerId.subscribe(user => this.customerId = user);
        this.authenticationService.storeId.subscribe(user => this.storeId = user);
       this.authenticationService.stockDate.subscribe((year) => {
       if (year) {
         this.year = year;
         this.getreservedFileData();
       }
     });
   
    }

  }

  manageUser(customerId: any) {
    this.router.navigate([`user/${customerId}`]);
  }

  manageStore(customerId: any) {
    this.router.navigate([`store/${customerId}`]);
  }

  getreservedFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getReservedList(workload).subscribe({
      next: (event: any) => {
        this.reservedList = event;
        this.spinner.hide();
      }
    });
  }

  onlogout() {
    this.authenticationService.logout();
  }

}

