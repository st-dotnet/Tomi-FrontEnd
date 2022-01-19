import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {

  stockList: any;
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
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    // this.authenticationService.storeId.subscribe(user => this.storeId = user);
    // this.authenticationService.stockDate.subscribe((year) => {
    //   if (year) {
    //     this.year = year;
    //     this.getSaleFileData();
    //   }
    // });
    this.authenticationService.stockList.subscribe((user: any) => this.stockList = user);

  }

  manageUser(customerId: any) {
    this.router.navigate([`user/${customerId}`]);
  }
  manageStore(customerId: any) {
    this.router.navigate([`store/${customerId}`]);
  }

  getSaleFileData() {
    var event = new Date(this.year);
    this.spinner.show();
    let date = JSON.stringify(event)
    date = date.slice(1, 11)

    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: date
    };
    this.spinner.show();
    this.authenticationService.getStockList(workload).subscribe({
      next: (event: any) => {
        this.stockList = event;
        this.spinner.hide();
      }

    });
  }

  onlogout() {
    this.authenticationService.logout();
  }
}