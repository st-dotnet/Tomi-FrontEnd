import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { formStore } from '@app/_models/stockAdjustment';
import { fileStoreService, UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { bufferToggle, first, Observable } from 'rxjs';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-workloads',
  templateUrl: './workloads.component.html',
  styleUrls: ['./workloads.component.css']
})
export class WorkloadsComponent implements OnInit {
  headerName: string = '';
  isMasterFileUpload: boolean = false;
  isDepartmentFileUpload:boolean= false;
  isStockFileUpload: boolean = false;
  isSaleFileUpload: boolean = false;
  //
  isReservedFileUpload:boolean=false;
  isParametersFilesUpload:boolean=false;
  isCategoriesFileUpload:boolean=false;
  //
  workloads$!: Observable<any[]>;
  stockfileUploading: boolean = false;
  masterfileUploading: boolean = false;
  salefileUploading: boolean = false;
  //
  reservefileUploading: boolean = false;
  perametesByDepartmentfileUploading: boolean = false;
  categoriesfileUploading: boolean = false;
  //
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
  selectedDepartmentFiles?: FileList;
  //
  selectedReservedFiles?: FileList;
  selectedPerametrsByDepartmentsFiles?: FileList;
  selectedCategoriesFiles?: FileList;
  //
  currentFile?: File;
  progress = 0;
  message = '';
  fileUploaded = false;
  stockRecordCount: any;
  activeTab = '1';
  masterfileUpload: boolean = false;
  stockfileUpload: boolean = false;
  saleFileUpload: boolean = false;
  departmentFileUpload: boolean = false;

  //
  reserveFileUpload:boolean=false;
  perametersByDepartmentFileUpload:boolean=false;
  categoriesFileUpload:boolean=false;
  //

  uploadFiletab: any;
  updatemasterfile: boolean = false;
  updateSalefile: boolean = false;
  updateStockfile: boolean = false;
  updateDepartmentfile:boolean=false;
  //
  updateReservedFile:boolean=false;
  updateParametrsDepartmentFile:boolean=false;
  updateCategoriesFile:boolean=false;

  //
  masterRecordCount: any;
  departmentRecordCount:any;
  timeElapsed: any;
  saleRecordCount: any;
  CheckMasterFile: boolean = false;
  disablemasterfileupdate: boolean = false;
  disablestockfileupdate: boolean = false;
  disablesalefileupdate: boolean = false;
  disabledepartmentfileupdate: boolean=false;
  departmentfileUploading: boolean= false;
  //
  disableReservedfileupdate: boolean=false;
  disableCategoryfileupdate: boolean=false;
  disableparametersbydepartmentfileupdate: boolean= false;
  reserveRecordCount: any;
  parameterRecordCount: any;
  categoryRecordCount: any;
  departmenttimeElapsed: any;
  CategorytimeElapsed: any;
  parametertimeElapsed: any;
  reservetimeElapsed: any;
  storeName: any;

  printDate = new Date();
  rangeList: any=formStore;
  printSectionId: any;

  constructor(private router: Router, private datepipe: DatePipe,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private toastrService : ToastrService, 
    private fileservice : fileStoreService) {
    this.getallCustomList();
  }

  ngOnInit(): void {
    
    this.authenticationService.activeTab.subscribe(activetab => this.activeTab = activetab);
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
    switch (file) {
      case "master":
        this.updatemasterfile = true;
        this.selectedMasterFiles = event.target.files;
        break;

      case "sales":
        this.selectedFiles = event.target.files;
        this.updateSalefile = true;
        break;

      case "stock":
        this.updateStockfile = true;
         this.selectedStockFiles = event.target.files;
        break;
      case "department":
        this.selectedDepartmentFiles = event.target.files;
        this.updateDepartmentfile = true;
        break;

     //
        case "reserved":
        this.selectedReservedFiles = event.target.files;
        this.updateReservedFile = true;
        break;

        case "parametersByDepartment":
        this.selectedPerametrsByDepartmentsFiles = event.target.files;
        this.updateParametrsDepartmentFile = true;
        break;

        case "categories":
        this.selectedCategoriesFiles = event.target.files;
        this.updateCategoriesFile = true;
        break;
   //

    }
    // if (file == "master") {
    //   this.updatemasterfile = true;
    //   this.selectedMasterFiles = event.target.files;
    // } else if (file == "sales") {
    //   this.selectedFiles = event.target.files;
    //   this.updateSalefile = true;
    // }
    // else if (file == "stock") {
    //   this.updateStockfile = true;
    //   this.selectedStockFiles = event.target.files;
    // }


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
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disablestockfileupdate.subscribe(user => this.disablestockfileupdate = user);

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
        formData.append('storeName', this.storeName);

        this.stockfileUploading = true;
        this.authenticationService.setStockUpload(this.stockfileUploading);
        this.authenticationService.setStockfileUploaddisable(false);
        this.authenticationService.uploadStockFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) 
            {
              this.stockfileUploading = false;
              this.authenticationService.setStockUpload(this.stockfileUploading);
              this.stockRecordCount = event.stockRecordCount;
              this.selectedStockFiles = undefined;
              this.stockfileUpload = true;
              this.authenticationService.setStockfileUploaddisable(true);
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };

                this.authenticationService.getstockData(workload);
                this.isStockFileUpload = !this.isStockFileUpload;
                this.stockfileUpload = false;
                // this.saleFileUpload = false;
              }, 3000);
              this.spinner.hide();
            }
            else{
              debugger;
                 this.stockfileUploading = false;
                 this.authenticationService.setStockUpload(this.stockfileUploading);
                 this.toastrService.error(event.error);
               }
          },
          error: (err: any) => {
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
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disablemasterfileupdate.subscribe(user => this.disablemasterfileupdate = user);
    if (this.selectedMasterFiles) {
      const file: File | null = this.selectedMasterFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.disablemasterfileupdate = false;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.masterfileUploading = true;

        this.authenticationService.setMasterfileUplaod(this.masterfileUploading);
        this.authenticationService.setMasterfilbrowser(false);
        this.authenticationService.uploadMasterFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.masterfileUploading = false;
              this.fileUploaded = true;
              this.authenticationService.setMasterfileUplaod(this.masterfileUploading);
              this.masterRecordCount = event.stockRecordCount;
              this.timeElapsed = event.timeElapsed;
              this.masterfileUpload = true;
              this.disablemasterfileupdate = true;
              this.authenticationService.setMasterfilbrowser(true);
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };

                this.authenticationService.getMasterData(workload);
                this.isMasterFileUpload = !this.isMasterFileUpload;
                this.masterfileUpload = false;
              }, 150000);
              this.spinner.hide();
            }
            else{
              // debugger;
                  this.masterfileUploading = false;
                  this.authenticationService.setMasterfileUplaod(this.masterfileUploading);
                  this.toastrService.error(event.error);
                  this.masterfileUpload = true;
                  this.disablemasterfileupdate = true;
                  this.authenticationService.setMasterfilbrowser(true);
                }
          },
          error: (err: any) => {
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

  uploadDepartmentFile(): void {
    this.spinner.show();
    this.updateDepartmentfile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disabledepartmentfileupdate.subscribe(user => this.disabledepartmentfileupdate = user);
    if (this.selectedDepartmentFiles) {
      const file: File | null = this.selectedDepartmentFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.disabledepartmentfileupdate = false;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.departmentfileUploading = true;

        this.authenticationService.setDepartmentfileUplaod(this.departmentfileUploading);
        this.authenticationService.setDepartmentfilebrowser(false);
        this.authenticationService.uploadDepartmentFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.departmentfileUploading = false;
              this.fileUploaded = true;
              this.authenticationService.setDepartmentfileUplaod(this.departmentfileUploading);
              this.departmentRecordCount = event.stockRecordCount;
              this.departmenttimeElapsed = event.timeElapsed;

              this.departmentFileUpload = true;
              this.disabledepartmentfileupdate = true;
              this.authenticationService.setDepartmentfilebrowser(true);
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };
                this.authenticationService.getDepartmentData(workload);
                this.isDepartmentFileUpload = !this.isDepartmentFileUpload;
                this.departmentFileUpload = false;
              }, 15000);
              this.spinner.hide();
            }
            else{
              // debugger;
                  this.departmentfileUploading = false;
                  this.authenticationService.setDepartmentfileUplaod(this.departmentfileUploading);
                  this.toastrService.error(event.error);
                  this.departmentFileUpload = true;
                  this.disabledepartmentfileupdate = true;
                  this.authenticationService.setDepartmentfilebrowser(true);
                }
          },
          error: (err: any) => {
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
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disablesalefileupdate.subscribe(user => this.disablesalefileupdate = user);
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
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.salefileUploading = true;
        this.authenticationService.setSalefileUpload(this.salefileUploading);
        this.authenticationService.setSalefileUploaddisable(false);
        this.authenticationService.uploadSalesFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.salefileUploading = false;
              this.authenticationService.setSalefileUpload(false);
              this.stockRecordCount = event.stockRecordCount;
              this.stockfileUpload = true;
              this.disablestockfileupdate = true;
              this.authenticationService.setSalefileUploaddisable(true);
              this.saleFileUpload = true;
              this.selectedFiles = undefined;
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };
                this.authenticationService.setSalefileUploaddisable(true);
                this.authenticationService.getSalesData(workload);
                this.isSaleFileUpload = !this.isSaleFileUpload;
                this.saleFileUpload = false;
                this.saleFileUpload = false;
              }, 3000);
              this.spinner.hide();

            }
            else{
              // debugger;
                  this.salefileUploading = false;
                  this.authenticationService.setSalefileUpload(this.salefileUploading);
                  this.toastrService.error(event.error);
                  this.saleFileUpload = true;
                  this.disablestockfileupdate = true;
                  this.authenticationService.setSalefileUploaddisable(true);
                }
          },
          error: (err: any) => {
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

  //my changes
  uploadReservedFile(): void {
    this.spinner.show();
    this.updateReservedFile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disablereservedfileupdate.subscribe(user => this.disableReservedfileupdate = user);
    if (this.selectedReservedFiles) {
      const file: File | null = this.selectedReservedFiles.item(0);
      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.reservefileUploading = true;
        this.authenticationService.setReservedfileUpload(this.reservefileUploading);
        this.authenticationService.setReservefileUploadDisable(false);
        this.authenticationService.uploadReservedFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) 
            {
              this.reservefileUploading = false;
              this.authenticationService.setReservedfileUpload(false);
              this.reserveRecordCount = event.stockRecordCount;
              this.reservetimeElapsed = event.timeElapsed;
              this.reserveFileUpload = true;
              this.selectedFiles = undefined;
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };
                this.authenticationService.setReservefileUploadDisable(true);
                this.authenticationService.getReservedData(workload);
                this.isReservedFileUpload = !this.isReservedFileUpload;
                this.reserveFileUpload = false;
              }, 3000);
              this.spinner.hide();
            }
            else{
              // debugger;
                  this.reservefileUploading = false;
                  this.authenticationService.setReservedfileUpload(this.reservefileUploading);
                  this.toastrService.error(event.error);
                  this.reserveFileUpload = true;
                  this.authenticationService.setReservefileUploadDisable(true);
                }
          },
          error: (err: any) => {
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


  uploadPerameterByDepartmentFile(): void {
    this.spinner.show();
    this.updateParametrsDepartmentFile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disabledepartmentfileupdate.subscribe(user => this.disabledepartmentfileupdate = user);
    if (this.selectedPerametrsByDepartmentsFiles) {
      const file: File | null = this.selectedPerametrsByDepartmentsFiles.item(0);
      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.perametesByDepartmentfileUploading = true;
        this.authenticationService.setParameterBydepartmentfileUpload(this.perametesByDepartmentfileUploading);
        this.authenticationService.setparameterfileUploadDisable(false);
        this.authenticationService.uploadParameterByDepartmentFile(formData).subscribe({
          next: (event: any) => {
            if (event.success) {
              this.perametesByDepartmentfileUploading = false;
              this.authenticationService.setParameterBydepartmentfileUpload(false);
              this.parameterRecordCount = event.stockRecordCount;
              this.parametertimeElapsed = event.timeElapsed;
              this.perametersByDepartmentFileUpload = true;
              this.selectedFiles = undefined;
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };
                this.authenticationService.setparameterfileUploadDisable(true);
                this.authenticationService.getParametersByDepartmentData(workload);
                this.isParametersFilesUpload = !this.isParametersFilesUpload;
                this.perametersByDepartmentFileUpload = false;
              }, 3000);
              this.spinner.hide();
            }
            else{
              // debugger;
                  this.perametesByDepartmentfileUploading = false;
                  this.authenticationService.setParameterBydepartmentfileUpload(this.perametesByDepartmentfileUploading);
                  this.toastrService.error(event.error);
                  this.perametersByDepartmentFileUpload = true;
                  this.authenticationService.setparameterfileUploadDisable(true);
                }

          },
          error: (err: any) => {
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

  uploadCategoriesFile(): void {
    this.spinner.show();
    this.updateCategoriesFile = false;
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    this.authenticationService.disablecategoryfileupdate.subscribe(user => this.disableCategoryfileupdate = user);
    if (this.selectedCategoriesFiles) {
      const file: File | null = this.selectedCategoriesFiles.item(0);
        if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        var event = new Date(this.year);
        let date = JSON.stringify(event)
        date = date.slice(1, 11)
        formData.append('file', file);
        formData.append('storeId', this.storeId);
        formData.append('storeName', this.storeName);
        formData.append('customerId', this.customerId);
        formData.append('stockDate', date);
        this.categoriesfileUploading = true;

        this.authenticationService.setCategoriesfileUpload(this.categoriesfileUploading);
        this.authenticationService.setCategoryfileUploadDisable(false);
        this.authenticationService.uploadCategoriesFile(formData).subscribe({

          next: (event: any) => {
            if (event.success) {
              this.categoriesfileUploading = false;
              this.authenticationService.setCategoriesfileUpload(false);
              this.categoryRecordCount = event.stockRecordCount;
              this.CategorytimeElapsed = event.timeElapsed;
              this.categoriesFileUpload = true;
              this.selectedFiles = undefined;
              setTimeout(() => {
                let workload = {
                  customerId: this.customerId,
                  storeId: this.storeId,
                  stockDate: this.year,
                };
                this.authenticationService.setCategoryfileUploadDisable(true);
                this.authenticationService.getSalesData(workload);
                this.isCategoriesFileUpload = !this.isCategoriesFileUpload;
                this.categoriesFileUpload = false;
              }, 3000);
              this.spinner.hide();
            }
            else{
              // debugger;
                  this.categoriesfileUploading = false;
                  this.authenticationService.setCategoriesfileUpload(this.categoriesfileUploading);
                  this.toastrService.error(event.error);
                  this.categoriesFileUpload = true;
                  this.authenticationService.setCategoryfileUploadDisable(true);
                }
          },
          error: (err: any) => {
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

  //
  submitFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: this.year,
    };
    this.authenticationService.getMasterData(workload);
    this.isStockFileUpload = !this.isStockFileUpload;
    // this.authenticationService.getSalesList(workload);
  };


  submitStockFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: this.year,
    };
    this.authenticationService.getstockData(workload);
    this.isStockFileUpload = !this.isStockFileUpload;
    // this.router.navigate(['/stockList']);
  };

  submitSaleFile() {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    let workload = {
      customerId: this.customerId,
      storeId: this.storeId,
      stockDate: this.year,
    };
    this.authenticationService.getSalesData(workload);
    this.isSaleFileUpload = !this.isSaleFileUpload;
  };


  submitAdvantoryFile() {
    this.router.navigate(['/workorders']);
  }
  onlogout() {
    this.authenticationService.logout();
  }
  checkSideInputDate() {

  }
  // getInformation() {
  //   debugger;
  //   this.authenticationService.storeName.subscribe(user => this.storeName = user);
  //   this.authenticationService.stockDate.subscribe(user => this.year = user);
  //   this.fileservice.getInformation(this.storeName,this.datepipe.transform(this.year, 'MMyy')).subscribe({
  //     next: (event: any) => {
  //       debugger;
  //       this.rangeList = event;
  //       this.spinner.hide();
  //     }});
  // }

  print(){
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
    //this.fileservice.getInformation(this.storeName,this.datepipe.transform(this.year, 'MMyy')).subscribe({
      this.fileservice.getInformation(this.storeName,'0920').subscribe({
      next: (response: any) => {
       this.rangeList=response;
      }})

      debugger;
       let printContents, popupWin;
       printContents = document.getElementById('printSectionId')?.innerHTML;
      
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin?.document.open();
      popupWin?.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin?.document.close();
    }
  checkMasterfileUpload() {
    this.isMasterFileUpload = !this.isMasterFileUpload;
    this.authenticationService.disablemasterfileupdate.subscribe(user => this.disablemasterfileupdate = user);
  }                                                 
  checkDepartmentFileupload(){
    this.isDepartmentFileUpload= !this.isDepartmentFileUpload;
    this.authenticationService.disabledepartmentfileupdate.subscribe(user => this.disabledepartmentfileupdate = user);
  }

  checkReservedFileupload(){
    this.isReservedFileUpload= !this.isReservedFileUpload;
    this.authenticationService.disablereservedfileupdate.subscribe(user => this.disableReservedfileupdate = user);
  }
  checkParameterFileupload(){
    this.isParametersFilesUpload= !this.isParametersFilesUpload;
    this.authenticationService.disableparametersbydepartmentfileupdate.subscribe(user => this.disableparametersbydepartmentfileupdate = user);
  }
  checkCategoryFileupload(){
    this.isCategoriesFileUpload= !this.isCategoriesFileUpload;
    this.authenticationService.disablecategoryfileupdate.subscribe(user => this.disableCategoryfileupdate = user);
  }
  onDepartmentClick(){
    this.authenticationService.disabledepartmentfileupdate.subscribe(user => this.disabledepartmentfileupdate = user);
    if(!this.disabledepartmentfileupdate)
    this.isDepartmentFileUpload = true;
    else
    this.isDepartmentFileUpload = false;
  }
  onMenuClick(){

    this.authenticationService.disablemasterfileupdate.subscribe(user => this.disablemasterfileupdate = user);
    if(!this.disablemasterfileupdate)
    this.isMasterFileUpload = true;
    else
    this.isMasterFileUpload = false;
  }

  onReservedClick(){
    this.authenticationService.disablereservedfileupdate.subscribe(user => this.disableReservedfileupdate = user);
    if(!this.disableReservedfileupdate)
    this.isReservedFileUpload = true;
    else
    this.isReservedFileUpload = false;
  }
  onParametrByDepartmentClick(){
    this.authenticationService.disableparametersbydepartmentfileupdate.subscribe(user => this.disableparametersbydepartmentfileupdate = user);
    if(!this.disableparametersbydepartmentfileupdate)
    this.isParametersFilesUpload = true;
    else
    this.isParametersFilesUpload = false;
  }
  onCategoriesClick(){
    this.authenticationService.disablecategoryfileupdate.subscribe(user => this.disableCategoryfileupdate = user);
    if(!this.disableCategoryfileupdate)
    this.isCategoriesFileUpload = true;
    else
    this.isCategoriesFileUpload = false;
  }
}
