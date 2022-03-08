import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '@app/_services';
import { loadingformationService } from '@app/_services/informationLoading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-loadinformation',
  templateUrl: './loadinformation.component.html',
  styleUrls: ['./loadinformation.component.css']
})
export class LoadinformationComponent implements OnInit {
  spinner: any;
  customerId: any;
  storeName: any;
  year: any;
  informationList: any;
  informationLoadingform!:FormGroup;
  storeId: any;


  constructor(private modalService: NgbModal,private loadingformationService:loadingformationService, 
    private toastrService: ToastrService, 
    private authenticationService: UserService) { }

  ngOnInit(): void {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
  }
  generateRecordMFSummary(){
    this.loadingformationService.GenerateInformationLoading()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
       this.informationList=response;
        this.modalService.dismissAll();
      }
    });
  }
  terminalDetails(tagId: any)
  {

  }
  // generateRecordMFSummary(){
  //   debugger;
  //   this.spinner.show();
  //   this.loadingformationService.GenerateInformationLoading()
  //   .pipe(first())
  //   .subscribe({
  //     next: (response: any) => {
  //      this.reportInformationLoadingList=response;
  //      console.log(response);
  //      this.spinner.hide();
  //       this.modalService.dismissAll();
  //     }
  //   });
  // }
  // generateRecordMFSummary(){
  //   debugger;
  //   this.spinner.show();
  //   // if (this.customerId && this.storeName && this.year)
  //   //  {
  //   //   const formData: FormData = new FormData();
  //   //   var event = new Date(this.year);
  //   //   let date = JSON.stringify(event)
  //   //   date = date.slice(1, 11)
  //   //   formData.append('storeId', this.storeId);
  //   //   formData.append('customerId', this.customerId);
  //   //   formData.append('stockDate', date);
  //   //   formData.append('storeName', this.storeName);
  //     // debugger;
  //     // this.loadinformationService.GenerateInformationLoading(formData)
  //     debugger;
  //     this.loadinformationService.GenerateInformationLoading()
  //     .pipe(first())
  //     .subscribe({
  //       next: (response: any) => {
  //         this.spinner.hide();
  //        this.reportInformationLoadingList=response;
  //       }
  //     });
  //   } 
    // else 
    // {
    //   this.toastrService.error("Please Select the Customer, Store and Date")
    // }
  //}
}
