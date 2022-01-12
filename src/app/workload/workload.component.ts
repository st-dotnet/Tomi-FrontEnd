import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkLoad } from '@app/_models';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.component.html',
  styleUrls: ['./workload.component.css']
})
export class WorkloadComponent implements OnInit {
  customers: any;
  stock:any;
  customerId:any;
  stores: any;
  storeId: any;
  years: any;
  stockyear:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(     private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { 
      this.getallCustomList();
    }

  ngOnInit(): void {
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
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  getallCustomList(){
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
    })
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
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
    
        formData.append('file', file);
        formData.append('storeId',this.storeId);
        formData.append('customerId',this.customerId);
        formData.append('stockDate',this.stockyear);
        
        this.authenticationService.uploadStockFile(formData).subscribe({
          next: (event: any) => {
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }
}
