import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentList: any;
  customerId: any;
  storeId: any;
  year: any;
  p: number = 1;
  diasbledepartmentFile: boolean= false;

  constructor(
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
  ) { 

  }

  ngOnInit(): void {
    this.authenticationService.disabledepartmentfileupdate.subscribe(user => this.diasbledepartmentFile = user);
    if(!this.diasbledepartmentFile)
    {
      
     this.authenticationService.departmentList.subscribe(user => this.departmentList = user);
    }
    else{
         this.authenticationService.customerId.subscribe(user => this.customerId = user);
        this.authenticationService.storeId.subscribe(user => this.storeId = user);
       this.authenticationService.stockDate.subscribe((year) => {
       if (year) {
         this.year = year;
         this.getdepartmentFileData();
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

  getdepartmentFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getDepartmentList(workload).subscribe({
      next: (event: any) => {
        this.departmentList = event;
        this.spinner.hide();
      }
    });
  }

  onlogout() {
    this.authenticationService.logout();
  }

}
