import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first, timer, timestamp } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-getLabelDetailsOption',
  templateUrl: './reportoption.component.html',
  styleUrls: ['./reportoption.component.css']
})

export class reportOptionComponents implements OnInit {

  reportOptionLoadingServicesform!: FormGroup;
  reportList: any;
  p: number = 1;
  options: any;
  printDate = new Date();
  storeName: any;
  stockDate: Date = new Date();
  search: any=0;
  tagto: any=0;
  value:any=[];
  total: number | any;
  price: number | any;
  term: any;
  empno: any;
  linenumber: number| any;
  exprice: number| any;
  constructor(
    private formbuilder: FormBuilder,
    private modalService: NgbModal,
    private authenticationService: UserService,
    private reportOptionLoadingServices: reportOptionLoadingServices,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.getLabelInformation();
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe((date: Date) => {
      debugger
     // this.stockDate =  date.setDate(date.getDate() - 1);
     this.stockDate.setDate(date.getDate() - 1);
    });
  }

  getLabelInformation() {
    this.spinner.show();
    this.reportOptionLoadingServices.getLabelDetailsInformation(this.search,this.tagto)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.findsum(response);  
          this.spinner.hide();
          this.reportList = response;
        }
      });
  }
  findsum(data:any[])
  { 
    debugger;
      this.value=data    
      this.term=this.value[0].term;
      this.empno=this.value[0].empno;
      
    for(let j=0;j<data.length;j++)
    {   
      debugger;
      //for Quantity Price
      var firstprice=parseFloat(this.price)
      var secondprice=parseFloat(this.value[j].orderJob.salePrice);
      var firstlinenumber=1;
     
// for importe
var firstimporte=parseFloat(this.exprice)
var secondimporte=parseFloat(this.value[j].orderJob.salePrice);
var finalimporte=secondimporte* parseInt(this.value[j].quantity);


if (!firstimporte)
      firstimporte = 0;
      if (!secondimporte)
      secondimporte = 0;


      if (!firstprice)
        firstprice = 0;
      if (!secondprice)
         secondprice = 0;

//for Quantity Sum
      var firstNum = parseInt(this.total) 
      var secondNum = parseInt(this.value[j].quantity);
     

      if (!firstNum)
        firstNum = 0;
      if (!secondNum)
        secondNum = 0;
        
debugger;
      this.exprice=firstimporte+secondimporte;
      this.total=firstNum + secondNum;
      this.price=firstprice + secondprice;
      this.linenumber=firstlinenumber+firstlinenumber;
      this.exprice=firstimporte+finalimporte;

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

}
