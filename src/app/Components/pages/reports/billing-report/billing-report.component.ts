import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-billing-report',
  templateUrl: './billing-report.component.html',
  styleUrls: ['./billing-report.component.css']
})
export class BillingReportComponent implements OnInit {
  reportOptionLoadingServicesform!:FormGroup;
  billingList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  stockDate: Date = new Date();
  items: any;
  modalClass: string | undefined;
  departments: any;
  form: FormGroup | undefined ;
  storeAddress: any;
  constructor(private formbuilder:FormBuilder, private modalService:NgbModal,private authenticationService: UserService,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) 
  {
    this.getBillingReportInformation(); 
    this.form = this.formbuilder.group({
      checkArray: this.formbuilder.array([])
    })
    
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.storeAddress.subscribe(user => this.storeAddress = user);
    this.authenticationService.stockDate.subscribe((date: Date) => {
      debugger
      // this.stockDate =  date.setDate(date.getDate() - 1);
      this.stockDate.setDate(date.getDate() - 1);
    });
   }


   ngOnInit(): void 
  {
  this.options = {
  fieldSeparator: ' ',
  quoteStrings: '',
  decimalseparator: '.',
  showLabels: false,
  showTitle: false,
  useBom: false,
  noDownload: false,
  useHeader: false,
  //headers: ["sku","department","retailPrice"],
  nullToEmptyString: true,
  }
}
getBillingReportInformation(){
  this.spinner.show();
  this.reportOptionLoadingServices.getInventoryBillingReport()
  .pipe(first())
  .subscribe({
    next: (response: any) => {
      console.log("response : ",response);
      this.spinner.hide();
     this.billingList=response;
    }
  });
}
}
