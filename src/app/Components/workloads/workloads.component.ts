import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-workloads',
  templateUrl: './workloads.component.html',
  styleUrls: ['./workloads.component.css']
})
export class WorkloadsComponent implements OnInit {
  workloads$!: Observable<any[]>;
  fileUploading: boolean= false;
  customers: any;
  stock:any;
  customerId:any;
  stores: any;
  storeId: any;
  years: any;
  year:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileUploaded = false;
  stockRecordCount: any;
  uploadFiletab:any;
  constructor(     private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { 
      this.getallCustomList();
    }

    ngOnInit(): void {
      debugger;
      this.authenticationService.customerId.subscribe(user => this.customerId = user);
      this.authenticationService.storeId.subscribe(user => this.storeId = user);
      this.authenticationService.stockDate.subscribe(user => this.year = user);
      this.activatedRoute.params.subscribe((params: Params) => {
        this.uploadFiletab = params['id'];
      });
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

  tabs = [1];
  counter = this.tabs.length + 1;
  active:any;

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
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
 this.fileUploading = true;
 

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        // var event = new Date(this.year);

        // let date = JSON.stringify(event)
        // date = date.slice(1,11)
        formData.append('file', file);
        formData.append('storeId',this.storeId);
        formData.append('customerId',this.customerId);
        formData.append('stockDate',this.year);

        if( this.uploadFiletab=="Stock"){
          this.authenticationService.setStockUpload(this.fileUploading);
          this.authenticationService.uploadStockFile(formData).subscribe({
            next: (event: any) => {
              debugger;
              if(event.success){
                this.fileUploading = false;
                this.fileUploaded= true;
                this.authenticationService.setStockUpload(false);
                  this.stockRecordCount = event.stockRecordCount;
                  this.selectedFiles = undefined;
              }
    
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
      else   if( this.uploadFiletab=="Master"){
        this.fileUploading = false;
        this.authenticationService.setMasterfileUplaod(this.fileUploading);
        this.authenticationService.uploadStockFile(formData).subscribe({
          next: (event: any) => {
            debugger;
            if(event.success){
              this.fileUploading = false;
              this.fileUploaded= true;
              this.authenticationService.setStockUpload(false);
                this.stockRecordCount = event.stockRecordCount;
                this.selectedFiles = undefined;
            }
  
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
      }

      this.selectedFiles = undefined;
    }
  }
}
