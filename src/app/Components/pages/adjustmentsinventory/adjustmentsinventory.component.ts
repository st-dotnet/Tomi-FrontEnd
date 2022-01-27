import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Master } from '@app/_models';
import { RangesService, UserService } from '@app/_services';
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

  adjustmentform!:FormGroup;
  editStockAdjustment!:FormGroup;
  submitted = false;
  editsubmitted = false;
  adjustmentList:any;
  searchText: string = "";
  p: number = 1;
  masterData!:Master;
  isSubmit:boolean=false;
  invalidsku:boolean=false;

  constructor(private formBuilder: FormBuilder,  private modalService: NgbModal,
    private rangesService: RangesService,
     private spinner: NgxSpinnerService,
     private toastrService: ToastrService,private userservice:UserService) { }
  adjustmentinventory! :false;



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
      rec: ['', Validators.required],
      term: ['', Validators.required],
      dload: ['', Validators.required],
      tag: ['', Validators.required],
      shelf: ['',Validators.required],
      barcode: ['', Validators.required],
      sku: ['',],
      mssku: ['',Validators.required ],
      nof: [0],
      //barcode:[''],
      ohquantity:[''],
      department: [1],
      quantity: ['', Validators.required],
      isdeleted: [false],
    });

    this.editStockAdjustment = this.formBuilder.group({
      //id: [''],
      rec1: ['', Validators.required],
      term1: ['', Validators.required],
      dload1: ['', Validators.required],
      tag1: ['', Validators.required],
      shelf1: ['',Validators.required],
    });
  }


  open(content: any) {
    this.submitted=false;
    this.isSubmit=false;
    this.adjustmentform.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     }, (reason) => {
    });
  }
  get f() { return this.adjustmentform.controls; }
  get f1() { return this.editStockAdjustment.controls; }


  onSubmit(){
    debugger;
    this.submitted = true;
    if (this.adjustmentform.invalid) {
      return;
    }
    this.adjustmentform.controls["nof"].setValue(0);
    this.rangesService.addAdjustment(this.adjustmentform.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.getAdjustment();
          this.modalService.dismissAll();
        }
      });
  }
  cancel()
  {
    this.modalService.dismissAll();
  }
  checkSkuData(sku:any){
    this.spinner.show();
    this.rangesService.getStoreBySku(sku.target.value)
    .pipe(first())
    .subscribe({
      next: (response) => {
       this.masterData=response;
       if(this.masterData)
       {
        this.adjustmentform.controls["barcode"].setValue(this.masterData.barcode);
        this.adjustmentform.controls["quantity"].setValue(this.masterData.ohQuantity);
        this.adjustmentform.controls["sku"].setValue(this.masterData.id);
        this.isSubmit=true;
        this.invalidsku=false;
       }
       else{
        this.isSubmit=false;
        this.invalidsku=true;
        this.adjustmentform.controls["barcode"].setValue('');
        this.adjustmentform.controls["quantity"].setValue('');
       }
       this.spinner.hide();
      }
    });
    this.spinner.hide();
  }

  getAdjustment(){
    this.spinner.show();
    this.rangesService.getAdjustment()
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.spinner.hide();
        console.log(response);
       this.adjustmentList=response;
        this.modalService.dismissAll();
      }
    });
  }


  recyle(model:any){
    debugger;
    this.spinner.show();
    this.rangesService.recycleAdjustment(model)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.getAdjustment();
        this.spinner.hide();
      }
    });
  }

  editAdjustment(model:any,content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
   });
   this.adjustmentList=model;
  }

  openFilter(content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
   });
  }

  edit(){
    this.editsubmitted=true;
    if (this.editStockAdjustment.invalid) {
      return;
    }
    this.spinner.show();
    this.rangesService.addAdjustment(this.adjustmentList)
      .pipe(first())
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.getAdjustment();
          this.modalService.dismissAll();
        }
      });
  }

  deleteAdjustment(id:any){
    this.spinner.show();
    this.rangesService.deleteAdjustment(id)
    .pipe(first())
    .subscribe({
      next: (response) => {
        this.getAdjustment();
        this.spinner.hide();
      }
    });
  }

  getAdjustmentById(id:any){
    this.rangesService.getAdjustmentById(id)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }
}
