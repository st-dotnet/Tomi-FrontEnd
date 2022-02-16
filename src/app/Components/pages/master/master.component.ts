import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {fileStoreService, UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';

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
  diasblemasterFile: boolean= false;
  storeName: any;
  printDate = new Date();
  modalService: any;
  constructor(
    private router: Router,
    private authenticationService: UserService,
    private fileStore:fileStoreService,
    private spinner: NgxSpinnerService,
  ){ }


  ngOnInit() {
    this.authenticationService.disablemasterfileupdate.subscribe(user => this.diasblemasterFile = user);
   if(!this.diasblemasterFile)
   { 
    this.authenticationService.masterList.subscribe(user => this.masterList = user);
   }
   else
   {
        this.authenticationService.customerId.subscribe(user => this.customerId = user);
       this.authenticationService.storeId.subscribe(user => this.storeId = user);
       this.authenticationService.storeName.subscribe(user => this.storeName = user);
      this.authenticationService.stockDate.subscribe((year) => {
      if (year) {
        this.year = year;
        this.getmasterFileData();
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

  getmasterFileData() {
    var event = new Date(this.year);
    let date = JSON.stringify(event)
    date = date.slice(1, 11);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      storeName:this.storeName,
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