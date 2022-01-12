import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, UserService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn=false;
  workloader?:string;
  customers: any;
  stores: any;
  storeId: any;
  years:any;
  customerId:any;
  stockyear:any;
  customer:any;
  masterfileUpload =false;
  stockfileUpload =false;
  salefileUpload = false;
  constructor(   private accountService: SessionService,    private authenticationService: UserService,
    private spinner: NgxSpinnerService,private router: Router) {
    const user = this.accountService.userValue;
    this.isLoggedIn = user && user.token;
   }

  ngOnInit(): void {
    this.authenticationService.customerId.subscribe(user => this.customer = user);
    debugger;
    this.authenticationService.masterfileUplaod.subscribe(file => this.masterfileUpload = file);
    this.authenticationService.stockfileUplaod.subscribe(file => this.stockfileUpload = file);
    if(this.customer!=""){
      this.customerId= this.customer;
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
  getallCustomList(){
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
    });
  };
  getAllStoreByCustomerId(customerId:any){;
    this.authenticationService.getAllStoreByCustomerId(customerId).subscribe(result => {
      if(result){
        this.stores = result.store;
        this.storeId = this.stores[0].id;
      }
       this.spinner.hide();
    });
  }
  submitFile(file:any){
    this.router.navigate(['/workorders', file]);

  }
  onChange(){
    debugger;
    if( this.customerId!=null ||  this.storeId!=null || this.stockyear!=null){
      let stockdate =new Date(this.stockyear.year,this.stockyear.month-1, this.stockyear.day);
      var event = new Date(stockdate);

      let date = JSON.stringify(event)
      date = date.slice(1,11)
      // this.authenticationService.setCustomerId(this.customerId);
      let workload ={
        customerId: this.customerId,
        storeId: this.storeId,
        stockDate: date
       };
       this.authenticationService.setCustomerId(this.customerId);
       this.authenticationService.setStoreId(this.storeId);
       this.authenticationService.setStockDate(stockdate);
        this.authenticationService.getstockData(workload);
    }

  
  }
}
