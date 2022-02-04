import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: any;
  customerId: any;
  storeId: any;
  year: any;
  p: number = 1;
  diasblecategoryFile: boolean= false;

  constructor(
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
  ) { 

  }

  ngOnInit(): void {
    this.authenticationService.disablecategoryfileupdate.subscribe(user => this.diasblecategoryFile = user);
    if(!this.diasblecategoryFile)
    {
      
     this.authenticationService.categoryList.subscribe(user => this.categoryList = user);
    }
    else{
         this.authenticationService.customerId.subscribe(user => this.customerId = user);
        this.authenticationService.storeId.subscribe(user => this.storeId = user);
       this.authenticationService.stockDate.subscribe((year) => {
       if (year) {
         this.year = year;
         this.getcategoryFileData();
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

  getcategoryFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getCategoryList(workload).subscribe({
      next: (event: any) => {
        this.categoryList = event;
        this.spinner.hide();
      }
    });
  }

  onlogout() {
    this.authenticationService.logout();
  }

}
