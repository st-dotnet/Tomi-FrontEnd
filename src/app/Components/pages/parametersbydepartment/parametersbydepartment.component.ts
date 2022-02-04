import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';;

@Component({
  selector: 'app-parametersbydepartment',
  templateUrl: './parametersbydepartment.component.html',
  styleUrls: ['./parametersbydepartment.component.css']
})


export class ParametersbydepartmentComponent implements OnInit {
  parametersbydepartmentList: any;
  customerId: any;
  storeId: any;
  year: any;
  p: number = 1;
  diasbleparametersbydepartmentFile: boolean= false;

  constructor(
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
  ) { 

  }

  ngOnInit(): void {
    this.authenticationService.disableparametersbydepartmentfileupdate.subscribe(user => this.diasbleparametersbydepartmentFile = user);
    if(!this.diasbleparametersbydepartmentFile)
    {
      
     this.authenticationService.parametersbydepartmentList.subscribe(user => this.parametersbydepartmentList = user);
    }
    else{
         this.authenticationService.customerId.subscribe(user => this.customerId = user);
        this.authenticationService.storeId.subscribe(user => this.storeId = user);
       this.authenticationService.stockDate.subscribe((year) => {
       if (year) {
         this.year = year;
         this.getparametersbydepartmentFileData();
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

  getparametersbydepartmentFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getParametersByDepartmentList(workload).subscribe({
      next: (event: any) => {
        this.parametersbydepartmentList = event;
        this.spinner.hide();
      }
    });
  }

  onlogout() {
    this.authenticationService.logout();
  }

}
