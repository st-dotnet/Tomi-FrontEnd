import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Pages } from '@app/_helper/enums';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  workloader?: string;
  customers: any;
  stores: any;
  storeId: any;
  years: any;
  customerId: any;
  stockyear: any;
  customer: any;
  masterfileUpload = false;
  stockfileUpload = false;
  salefileUpload = false;
  rangefileUpload = false;
  program_terminal = false;
  isFileUploadOption= false ;
  constructor(private accountService: SessionService, private authenticationService: UserService,
    private spinner: NgxSpinnerService, private router: Router,private toastrService: ToastrService) {

    const user = this.accountService.userValue;
    this.isLoggedIn = user && user.token;
  }

  ngOnInit(): void {

    this.authenticationService.customerId.subscribe(user => this.customer = user);

    this.authenticationService.masterfileUplaod.subscribe(file => this.masterfileUpload = file);
    this.authenticationService.stockfileUplaod.subscribe(file => this.stockfileUpload = file);
    this.authenticationService.salefileUpload.subscribe(file => this.salefileUpload = file);
    if (this.customer != "") {
      this.customerId = this.customer;
    }
    this.years = [
      {
        value: '2019'
      },
      {
        value: '2020'
      },
      {
        value: '2021'
      },
      {
        value: '2022'
      }
    ];
    this.getallCustomList();
  }
  getallCustomList() {
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
    });
  };
  getAllStoreByCustomerId(customerId: any) {
    ;
    this.authenticationService.getAllStoreByCustomerId(customerId).subscribe(result => {
      if (result) {
        this.stores = result.store;
        this.storeId = this.stores[0].id;
      }
      this.spinner.hide();
    });
  }

  submitFile(tab: any) {
    
    if (this.customerId==undefined || this.storeId==undefined || this.stockyear ==undefined)
      this.toastrService.error("Please select job order first");
    else
  {
    switch (tab) {
      case Pages.Master:
        this.authenticationService.setactiveTab(tab);
        break;
      case Pages.Stocks:
        this.authenticationService.setactiveTab(tab);
        break;
      case Pages.Sales:
        this.authenticationService.setactiveTab(tab);
        break;
      case Pages.Ranges:
        this.authenticationService.setactiveTab(tab);
        break;
        case Pages.programTerm:
        this.authenticationService.setactiveTab(tab);
        break;
      default:
        break;
    }
    this.router.navigate(['/workorders', Pages[tab]]);
  }

  }

  onChange() {
    
    if (this.customerId!=undefined && this.storeId!=undefined &&  this.stockyear!= undefined) {
      this.isFileUploadOption= true ;
      let stockdate = new Date(this.stockyear.year, this.stockyear.month - 1, this.stockyear.day + 1);
      this.stockyear.day = this.stockyear.day + 1;
      var event = new Date(stockdate);
      let date = JSON.stringify(event)
      date = date.slice(1, 11)

      let workload = {
        customerId: this.customerId,
        storeId: this.storeId,
        stockDate: date
      };
      this.authenticationService.setCustomerId(this.customerId);
      this.authenticationService.setStoreId(this.storeId);
      this.authenticationService.setStockDate(stockdate);
      this.authenticationService.getstockData(workload);
      this.authenticationService.getMasterData(workload);
      this.authenticationService.getSalesData(workload);
      this.authenticationService.setSalefileUploaddisable(true);
      this.authenticationService.setMasterfilbrowser(true);
      this.authenticationService.setStockfileUploaddisable(true);
    }
  }
}
