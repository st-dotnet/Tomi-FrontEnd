import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Master, StockFilterModel } from '@app/_models';
import { StockAdjustmentService, UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-adjustmentsinventory',
  templateUrl: './adjustmentsinventory.component.html',
  styleUrls: ['./adjustmentsinventory.component.css']
})
export class AdjustmentsinventoryComponent implements OnInit {

  adjustmentform!: FormGroup;
  editStockAdjustment!: FormGroup;
  submitted = false;
  editsubmitted = false;
  modalClass: string | undefined;
  adjustmentList: any;
  searchText: string = "";
  p: number = 1;
  masterData!: Master;
  isSubmit: boolean = false;
  invalidsku: boolean = false;
  gotoRecord!: FormGroup;
  gotoRecordSubmit: boolean = false;
  stockFilter: StockFilterModel = {};
  department?: number;
  invalidbarcode: boolean= false;
  editadjust: boolean= false;
  isTagvalueExist:  boolean= false;
  form: FormGroup;
  Data: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' }
  ];
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
  private stockAdjustmentService: StockAdjustmentService,
  private spinner: NgxSpinnerService,
  private toastrService: ToastrService, private userservice: UserService,private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })

  }
  adjustmentinventory!: false;



  // open(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

  //   }, (reason) => {
  //   });
  // }

  ngOnInit(): void {
    this.getAdjustment();

    // this.getAdjustmentById("9FC3863D-28D9-46B1-71BE-08D9DF53FEED");
    this.adjustmentform = this.formBuilder.group({
      //id: [''],
      // rec: ['', Validators.required],
      term: ['', Validators.required],
      dload: ['', Validators.required],
      tag: ['', Validators.required],
      shelf: ['', Validators.required],
      barcode: ['', Validators.required],
      sku: ['',],
      // mssku: ['', Validators.required],
      nof: [0],
      //barcode:[''],
      ohquantity: [''],
      department: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      isdeleted: [false],
    });

    this.editStockAdjustment = this.formBuilder.group({
      //id: [''],
      rec1: ['', Validators.required],
      term1: ['', Validators.required],
      dload1: ['', Validators.required],
      tag1: ['', Validators.required],
      shelf1: ['', Validators.required],
    });
    this.gotoRecord = this.formBuilder.group({
      rec: ['', Validators.required]
    })
  }

  open(content: any) {
    this.modalClass = 'mymodal',
    this.submitted = false;
    this.isSubmit = false;
    this.editadjust = false;
    this.isTagvalueExist= false;
    this.adjustmentform.reset();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-filteradd'
    }).result.then((result) => {
    }, (reason) => {
    });
  }

  get f() { return this.adjustmentform.controls; }
  get f1() { return this.editStockAdjustment.controls; }
  get gor() { return this.gotoRecord.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.adjustmentform.invalid) {
      return;
    }
    this.adjustmentform.controls["nof"].setValue(0);
    this.stockAdjustmentService.addAdjustment(this.adjustmentform.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.getAdjustment();
          this.modalService.dismissAll();
        }
      });
  }

  cancel() {
    this.modalService.dismissAll();
  }

  checkSkuData(sku: any) {
    this.spinner.show();
    this.stockAdjustmentService.getStoreBySku(sku.target.value)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(response);
          this.masterData = response.master;
          if (this.masterData) {
            this.adjustmentform.controls["department"].setValue(this.masterData.department);
            this.adjustmentform.controls["description"].setValue(this.masterData.description);
            this.adjustmentform.controls["price"].setValue(this.masterData.salePrice);
            this.adjustmentform.controls["sku"].setValue(this.masterData.id);
            this.isSubmit = true;
            this.invalidsku = false;
          }
          else {
            this.isSubmit = false;
            this.invalidsku = true;
            this.adjustmentform.controls["department"].setValue('');
            this.adjustmentform.controls["description"].setValue('');
            this.adjustmentform.controls["price"].setValue('');
          }
          this.spinner.hide();
        }
      });
    this.spinner.hide();
  }
  checkBarCodeData(sku: any) {
    this.spinner.show();
    this.stockAdjustmentService.getStoreByBarCode(sku.target.value)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(response);
          this.masterData = response.orderJob;
          if (this.masterData) {
            this.adjustmentform.controls["department"].setValue(this.masterData.department);
            this.adjustmentform.controls["description"].setValue(this.masterData.description);
            this.adjustmentform.controls["price"].setValue(this.masterData.salePrice);
            this.adjustmentform.controls["sku"].setValue(this.masterData.id);
            this.isSubmit = true;
            this.invalidbarcode = false;
          }
          else {
            this.isSubmit = false;
            this.invalidbarcode = true;
            this.adjustmentform.controls["department"].setValue('');
            this.adjustmentform.controls["description"].setValue('');
            this.adjustmentform.controls["price"].setValue('');
          }
          this.spinner.hide();
        }
      });
    this.spinner.hide();
  }

  checkTagValue(tagValue: any){
    this.isTagvalueExist= false;
    this.stockAdjustmentService.getTagValue(tagValue.target.value)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.isTagvalueExist= response;
      }});
  }
  getAdjustment() {
    this.spinner.show();
    this.stockAdjustmentService.getAdjustment()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.spinner.hide();
          this.adjustmentList = response;
          this.modalService.dismissAll();
        }
      });
  }

  getDeletedAdjustment() {
    this.spinner.show();
    this.stockAdjustmentService.GetDeletedStockAdjustment()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.spinner.hide();
          this.adjustmentList = response;
          this.modalService.dismissAll();
        }
      });
  }


  recyle(model: any) {
    this.spinner.show();
    this.stockAdjustmentService.recycleAdjustment(model)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.getAdjustment();
          this.spinner.hide();
        }
      });
  }

  editAdjustment(item: any, content: any) {
  this.editadjust= true;
  this.isTagvalueExist= false;
    this.adjustmentform.controls["department"].setValue(item.department);
    this.adjustmentform.controls["description"].setValue(item.orderJob.description);
    this.adjustmentform.controls["price"].setValue(item.orderJob.salePrice);
    this.adjustmentform.controls["sku"].setValue(item.id);
    this.adjustmentform.controls["barcode"].setValue(item.barcode);
    this.adjustmentform.controls["term"].setValue(item.term);
    this.adjustmentform.controls["dload"].setValue(item.dload);
    this.adjustmentform.controls["tag"].setValue(item.tag);
    this.adjustmentform.controls["shelf"].setValue(item.shelf);
    this.adjustmentform.controls["quantity"].setValue(item.quantity);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
   
  }

  openFilter(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  edit() {
    this.editsubmitted = true;
    if (this.editStockAdjustment.invalid) {
      return;
    }
    this.spinner.show();
    this.stockAdjustmentService.addAdjustment(this.adjustmentList)
      .pipe(first())
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.getAdjustment();
          this.modalService.dismissAll();
        }
      });
  }

  deleteAdjustment(id: any) {
    this.spinner.show();
    this.stockAdjustmentService.deleteAdjustment(id)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.getAdjustment();
          this.spinner.hide();
        }
      });
  }

  gotoRecordAdjustment() {
    this.gotoRecordSubmit = true;
    if (this.gotoRecord.invalid) {
      return;
    }
    this.spinner.show();
    this.stockAdjustmentService.gotoRecordId(this.gotoRecord.value.rec)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.spinner.hide();
          this.gotoRecordSubmit = false;
          this.adjustmentList = response;
          this.gotoRecord.reset();
          this.modalService.dismissAll();
        }
      });
  }

  cancelRecordnumber() {
    this.modalService.dismissAll();
    this.gotoRecordSubmit = false;
    this.gotoRecord.reset();
  }
  getAdjustmentById(id: any) {
    this.stockAdjustmentService.getAdjustmentById(id)
      .pipe(first())
      .subscribe({
        next: (response) => {
        }
      });
  }

  searchStock() {
    this.spinner.show();
    this.stockFilter = new StockFilterModel();
    this.stockFilter.searchtext = this.searchText;
    this.stockAdjustmentService.searchRecord(this.stockFilter)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.spinner.hide();
          this.adjustmentList = response;
          this.stockFilter = new StockFilterModel();
        }
      });
  }
  FilterData() {
    this.stockAdjustmentService.searchRecord(this.stockFilter)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.adjustmentList = response;
          this.stockFilter = new StockFilterModel();
          this.modalService.dismissAll();
        }
      });
  }

  cancelFilterData() {
    this.stockFilter = new StockFilterModel();
    this.modalService.dismissAll();
  }

  resetFilterData() {
    this.stockFilter = new StockFilterModel();
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.stockAdjustmentService.VoidTag(this.form.value.checkArray)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.getAdjustment();
        this.modalService.dismissAll();
      }
    });
  }
}
