import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  masterList: any;
  customerId: any;
  storeId: any;
  year: any;
  p: number = 1;
  constructor(
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit() {
   
    this.authenticationService.masterList.subscribe(user => this.masterList = user);
  }

  manageUser(customerId: any) {
    this.router.navigate([`user/${customerId}`]);
  }

  manageStore(customerId: any) {
    this.router.navigate([`store/${customerId}`]);
  }

  getmasterFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11)
    // this.authenticationService.setCustomerId(this.customerId);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getMasterList(workload).subscribe({
      next: (event: any) => {
        this.masterList = event;
        this.spinner.hide();
      }
    });
  }

  onlogout() {
    this.authenticationService.logout();
  }
}