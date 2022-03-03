import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@app/_services';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit {
  customerId: any;
  storeId: any;
  storeName: any;
  year: any;

  constructor(private reportOptionLoadingServices: reportOptionLoadingServices,
    private spinner: NgxSpinnerService,
    private authenticationService: UserService,
    private http: HttpClient,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
  }

  inventoryFigure() {
    debugger;
    this.spinner.show();
    if (this.customerId && this.storeName && this.year) {
      const formData: FormData = new FormData();
      var event = new Date(this.year);
      let date = JSON.stringify(event)
      date = date.slice(1, 11)
      formData.append('storeId', this.storeId);
      formData.append('customerId', this.customerId);
      formData.append('stockDate', date);
      formData.append('storeName', this.storeName);
      this.reportOptionLoadingServices.getInventoryFigureReportCustom(formData)
        .pipe(first())
        .subscribe((response) => {
          debugger;
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          const newBlob = new Blob([response], { type: 'application/text' });
          if (newBlob.size > 50) {
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
          }
          if ((window.navigator as any) && (window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(newBlob);
            return;
          }
          const fileName = response.type.split("|")[1];
          // For other browsers: 
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);
          window.open(data);
          const link = document.createElement('a');
          link.href = data;
          link.download = fileName.toUpperCase();
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
            this.spinner.hide();
          }, 200);

        })
    } 
    else 
    {
      this.toastrService.error("Please Select the Customer, Store and Date")
    }
  }

  inventoryReport(){
    debugger;
    this.spinner.show();
    if (this.customerId && this.storeName && this.year) {
      const formData: FormData = new FormData();
      var event = new Date(this.year);
      let date = JSON.stringify(event)
      date = date.slice(1, 11)
      formData.append('storeId', this.storeId);
      formData.append('customerId', this.customerId);
      formData.append('stockDate', date);
      formData.append('storeName', this.storeName);
      this.reportOptionLoadingServices.getInventoryReportCustom(formData)
        .pipe(first())
        .subscribe((response) => {
          debugger;
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          const newBlob = new Blob([response], { type: 'application/text' });
          if (newBlob.size > 50) {
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
          }
          if ((window.navigator as any) && (window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(newBlob);
            return;
          }
          const fileName = response.type.split("|")[1];
          // For other browsers: 
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);
          window.open(data);
          const link = document.createElement('a');
          link.href = data;
          link.download = fileName.toUpperCase();
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
            this.spinner.hide();
          }, 200);

        })
    } 
    else 
    {
      this.toastrService.error("Please Select the Customer, Store and Date")
    }
  }

  marbeteFigure(){
    debugger;
    this.spinner.show();
    if (this.customerId && this.storeName && this.year) {
      const formData: FormData = new FormData();
      var event = new Date(this.year);
      let date = JSON.stringify(event)
      date = date.slice(1, 11)
      formData.append('storeId', this.storeId);
      formData.append('customerId', this.customerId);
      formData.append('stockDate', date);
      formData.append('storeName', this.storeName);
      this.reportOptionLoadingServices.getMarbeteFigureReportCustom(formData)
        .pipe(first())
        .subscribe((response) => {
          debugger;
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should
          const newBlob = new Blob([response], { type: 'application/text' });
          if (newBlob.size > 50) {
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
          }
          if ((window.navigator as any) && (window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(newBlob);
            return;
          }
          const fileName = response.type.split("|")[1];
          // For other browsers: 
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);
          window.open(data);
          const link = document.createElement('a');
          link.href = data;
          link.download = fileName.toUpperCase();
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
            this.spinner.hide();
          }, 200);

        })
    } 
    else 
    {
      this.toastrService.error("Please Select the Customer, Store and Date")
    }
  }

}
