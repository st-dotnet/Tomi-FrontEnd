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
  headerName: string = '';
  isMasterFileUpload: boolean = false;
  isStockFileUpload: boolean = false;
  isSaleFileUpload: boolean = false;
  workloads$!: Observable<any[]>;
  stockfileUploading: boolean = false;
  masterfileUploading: boolean = false;
  salefileUploading: boolean = false;
  customers: any;
  stock: any;
  customerId: any;
  stores: any;
  storeId: any;
  years: any;
  year: any;
  selectedFiles?: FileList;
  selectedMasterFiles?: FileList;
  selectedStockFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileUploaded = false;
  stockRecordCount: any;
  activeTab = '1';
  masterfileUpload: boolean = false;
  stockfileUpload: boolean = false;
  saleFileUpload: boolean = false;
  uploadFiletab: any;
  updatemasterfile: boolean = false;
  updateSalefile: boolean = false;
  updateStockfile: boolean = false;
  masterRecordCount: any;
  saleRecordCount: any;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
    this.getallCustomList();
  }

  ngOnInit(): void {
    this.authenticationService.activeTab.subscribe(activetab => this.activeTab = activetab);
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
  active: any;

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }


  selectFile(event: any, file: any): void {
    this.updatemasterfile = false;
    this.updateSalefile = false;
    this.updateStockfile = false;
    if (file == "master") {
      this.updatemasterfile = true;
      this.selectedMasterFiles = event.target.files;
    } else if (file == "sales") {
      this.selectedFiles = event.target.files;
      this.updateSalefile = true;
    }
    else if (file == "stock") {
      this.updateStockfile = true;
      this.selectedStockFiles = event.target.files;
    }


  }
  getallCustomList() {
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
    })
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
  upload(): void {
    
    this.spinner.show();
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    if (this.selectedStockFiles) {
      const file: File | null = this.selectedStockFiles.item(0);

      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);

        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);

          this.stockfileUploading = true;
          this.authenticationService.setStockUpload(this.stockfileUploading);
          this.authenticationService.uploadStockFile(formData).subscribe({
            next: (event: any) => {
              if (event.success) {
                this.stockfileUploading = false;
                this.authenticationService.setStockUpload(this.stockfileUploading);
                this.stockRecordCount = event.stockRecordCount;
                this.selectedStockFiles = undefined;
                this.stockfileUpload = true;
                setTimeout(() =>{
                  let workload = {
                    customerId: this.customerId,
                    storeId:this.storeId,
                    stockDate:this.year,
                  };
              
                  this.authenticationService.getstockData(workload);
                  this.isStockFileUpload= !this.isStockFileUpload;
                  this.stockfileUpload = false;
                  // this.saleFileUpload = false;
                }, 3000);
                this.spinner.hide();
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
              this.spinner.hide();
            }
          });
      }

      this.selectedFiles = undefined;
    }
  }

  uploadMasterFile(): void {
    this.spinner.show();
    this.updatemasterfile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    if (this.selectedMasterFiles) {
      const file: File | null = this.selectedMasterFiles.item(0);
      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.masterfileUploading = true;
        this.authenticationService.setMasterfileUplaod(this.masterfileUploading);
        this.authenticationService.uploadMasterFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.masterfileUploading = false;
              this.fileUploaded = true;
              this.authenticationService.setMasterfileUplaod(this.masterfileUploading);
              this.masterRecordCount = event.stockRecordCount;
              this.masterfileUpload = true;
              setTimeout(() =>{
                let workload = {
                  customerId: this.customerId,
                  storeId:this.storeId,
                  stockDate:this.year,
                };
            
                this.authenticationService.getMasterData(workload);
                this.isMasterFileUpload= !this.isMasterFileUpload;
                this.masterfileUpload = false;
              }, 1000);
              this.spinner.hide();
            }
          },
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
            this.spinner.hide();
          }

        });


      }

      this.selectedFiles = undefined;
    }
  }

  uploadSaleFile(): void {
    this.spinner.show();
    
    this.updateSalefile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.salefileUploading = true;
        this.authenticationService.setSalefileUpload(this.salefileUploading);
        this.authenticationService.uploadSalesFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.salefileUploading = false;
              this.authenticationService.setSalefileUpload(false);
              this.stockRecordCount = event.stockRecordCount;
              this.saleFileUpload = true;
              this.selectedFiles = undefined;
              setTimeout(() =>{
                let workload = {
                  customerId: this.customerId,
                  storeId:this.storeId,
                  stockDate:this.year,
                };
            
                this.authenticationService.getSalesData(workload);
                this.isSaleFileUpload= !this.isSaleFileUpload;
                this.saleFileUpload = false;
                this.saleFileUpload = false;
              }, 3000);
              this.spinner.hide();
              
            }
          },
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
            this.spinner.hide();
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }
  submitFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
      this.authenticationService.storeId.subscribe(user => this.storeId = user);
     this.authenticationService.stockDate.subscribe(user => this.year = user);
     let workload = {
      customerId: this.customerId,
      storeId:this.storeId,
      stockDate:this.year,
    };
    this.authenticationService.getMasterData(workload);
    this.isStockFileUpload= !this.isStockFileUpload;
    // this.authenticationService.getSalesList(workload);
  };


  submitStockFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
   this.authenticationService.stockDate.subscribe(user => this.year = user);
  let workload = {
    customerId: this.customerId,
    storeId:this.storeId,
    stockDate:this.year,
  };
  this.authenticationService.getstockData(workload);
  this.isStockFileUpload= !this.isStockFileUpload;
   // this.router.navigate(['/stockList']);
  };

  submitSaleFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
   this.authenticationService.stockDate.subscribe(user => this.year = user);
  let workload = {
    customerId: this.customerId,
    storeId:this.storeId,
    stockDate:this.year,
  };
  this.authenticationService.getSalesData(workload);
  this.isSaleFileUpload= !this.isSaleFileUpload;
  };


  submitAdvantoryFile(){
    this.router.navigate(['/workorders']);
  }
  onlogout() {
    this.authenticationService.logout();
  }
}
