import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-variationby-sku',
  templateUrl: './variationby-sku.component.html',
  styleUrls: ['./variationby-sku.component.css']
})
export class VariationbySKUComponent implements OnInit {

  reportOptionLoadingServicesform!: FormGroup;
  reportList: any;
  p: number = 1;
  options: any;
  printDate = new Date();
  storeName: any;
  year: any;
  stockDate: Date = new Date();
  items: any;
  modalClass: string | undefined;
  departments: any;
  form: FormGroup;
  filtervalue: any = [];
  soh: number | any;
  contado: number | any;
  terico: number| any;
  diff: number | any;
  valuaction :number |any;
  precVtaNorm :number |any;
  absdiff : number | any;
  storeAddress: any;
  finalqty: number | any;

  constructor(private formbuilder: FormBuilder, private modalService: NgbModal, private authenticationService: UserService, private reportOptionLoadingServices: reportOptionLoadingServices, private spinner: NgxSpinnerService, private toastrService: ToastrService, private userService: UserService) {
    this.getLabelInformation();
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

  ngOnInit(): void {

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
  getLabelInformation() {
    this.spinner.show();
    this.reportOptionLoadingServices.getVariationBySKUInformation()
      .pipe(first())
      .subscribe({
        next: (response: any) => {

          //this.findsum();
          this.findsum(response);

          this.spinner.hide();
          this.reportList = response;
          this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];
        }
      });
  }
  findsum(data: any[]) {

    this.filtervalue = data;
    
   

    for (let j = 0; j < data.length; j++) {
  
      //for contado Sum
      var firstQty = parseInt(this.contado)
      var secondQty = parseInt(this.filtervalue[j].quantity);
      if (!firstQty)
        firstQty = 0;
      if (!secondQty)
        secondQty = 0;
     
        //  for Te??rico Sum 
     var firstterico = parseInt(this.terico)
     var secondterico = parseInt(this.filtervalue[j].soh);
     if (!firstterico)
       firstterico = 0;
     if (!secondterico)
       secondterico = 0;
      var firstprecVtaNorm =parseFloat(this.valuaction)
      var secondprecVtaNorm=parseFloat(this.filtervalue[j].precVtaNorm)

      if (!firstprecVtaNorm)
      firstprecVtaNorm = 0;
     if (!secondprecVtaNorm)
     secondprecVtaNorm = 0;

      this.valuaction= firstprecVtaNorm+secondprecVtaNorm;
      this.precVtaNorm=secondprecVtaNorm;
      
      this.terico=firstterico+secondterico;
      this.contado = firstQty + secondQty;
      this.diff=this.filtervalue[j].quantity-this.filtervalue[j].soh;
 debugger;
      var  myfirstqty= this.finalqty;
      var mysecondqty=this.diff * this.filtervalue[j].precVtaNorm;
      if (!myfirstqty)
        myfirstqty = 0;
      if (!mysecondqty)
        mysecondqty = 0;
     this.finalqty= myfirstqty+mysecondqty;
      this.absdiff=Math.abs(this.diff);
    }
  }
  openPDF() {
    const response = document.getElementById('htmlData') as HTMLElement;
    html2canvas(response).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('recordOptions.pdf');
    });
  }
  open(content: any) {
    console.log("departments", this.departments)
    this.items = [];
    this.modalClass = 'mymodal',
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'modal-filteradd'
      }).result.then((result) => {
      }, (reason) => {
      });
  }
  onCheckboxChange(e: any) {
    if (e.target.checked) {

      const index = this.items.findIndex((x: any) => x.value === e.target.value);

      if (index == -1) {

        this.items.push(new FormControl(e.target.value));
      }
    } else {

      const index = this.items.findIndex((x: any) => x.value === e.target.value);

      this.items.removeAt(index);

    }

  }
  filterDepartment() {
    this.reportOptionLoadingServices.getVariationBySKUInformation()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.reportList = response;
          console.log("res", response)
          this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];
          this.spinner.hide();
          const myArrayFiltered = this.reportList.filter((array: { department: any; }) => this.items.some((filter: any) => filter.value === array.department.toString()));
          this.reportList = myArrayFiltered;
          this.modalService.dismissAll();
        }

      });

  }
}
