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
  submitted = false;
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

  ngOnInit(): void {
    this.getAdjustment();
    this.getAdjustmentById("9FC3863D-28D9-46B1-71BE-08D9DF53FEED");
    this.adjustmentform = this.formBuilder.group({
      //id: [''],
      Rec: ['', Validators.required],
      Term: ['', Validators.required],
      Dload: ['', Validators.required],
      Tag: ['', Validators.required],
      Shelf: ['',Validators.required],
      Barcode: ['', Validators.required],
      SKU: ['',],
      MSSku: ['',Validators.required ],
      NOF: [0],
      //barcode:[''],
      ohquantity:[''],
      Department: [1],
      Quantity: ['', Validators.required],
      Isdeleted: [false],
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

  onSubmit(){
    debugger;
    this.submitted = true;
    if (this.adjustmentform.invalid) {
      return;
    }

    //this.adjustmentform.setValue["NOF"]=0;
    this.adjustmentform.controls["NOF"].setValue(0);
    this.rangesService.addAdjustment(this.adjustmentform.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.modalService.dismissAll();
        }
      });
  }

  checkSkuData(sku:any){
    debugger;
    this.rangesService.getStoreBySku(sku.target.value)
    .pipe(first())
    .subscribe({
      next: (response) => {
       this.masterData=response;
       if(this.masterData)
       {
        this.adjustmentform.controls["Barcode"].setValue(this.masterData.barcode);
        this.adjustmentform.controls["Quantity"].setValue(this.masterData.ohQuantity);

        this.adjustmentform.controls["SKU"].setValue(this.masterData.id);

        this.isSubmit=true;
        this.invalidsku=false;
       }
       else{
        this.isSubmit=false;
        this.invalidsku=true;
       }
        console.log(this.masterData);
      }
    });
  }

  getAdjustment(){
    this.rangesService.getAdjustment()
    .pipe(first())
    .subscribe({
      next: (response) => {
        //console.log(response);
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

  editAdjustment(model:any){

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
