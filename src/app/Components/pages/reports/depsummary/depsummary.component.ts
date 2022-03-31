import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-depsummary',
  templateUrl: './depsummary.component.html',
  styleUrls: ['./depsummary.component.css']
})
export class DepsummaryComponent implements OnInit {

  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  year: any;
  stockDate: Date = new Date();
  grobybydata: any = [];
  groupedData: any;
  storeAddress: any;
  total: number | any;
  quantity: number | any;
  value:any=[];
  soh: number| any;
  exprice: number| any;
  totalsin: number| any;
  constructor(private formbuilder:FormBuilder,private authenticationService: UserService, private modalService:NgbModal,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.storeAddress.subscribe(user => this.storeAddress = user);
    this.authenticationService.stockDate.subscribe((date: Date) => {
      debugger
     // this.stockDate =  date.setDate(date.getDate() - 1);
     this.stockDate.setDate(date.getDate() - 1);
    });
    this.getLabelInformation();
  }
  ngOnInit(): void 
  {
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
  this.getLabelInformation();

}
  getLabelInformation(){
    this.spinner.show();
    this.reportOptionLoadingServices.getBreakDownReportInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        this.spinner.hide();
       this.reportList=response;
       this.findsum(response);
      }
    });
  }
  findsum(data:any[])
  { 
    debugger;
      this.value=data    
    for(let j=0;j<data.length;j++)
    {   
      debugger;
      //for Quantity Price
      var firstquantity=parseFloat(this.quantity)
      var secondquantity=parseFloat(this.value[j].quantity);
     
    
     
// for Importe Total
var firstimporte=parseFloat(this.exprice)
var secondimporte=parseFloat(this.value[j].salePrice);
var finalimporte=secondimporte* parseInt(this.value[j].quantity);

// for sin Impuestos 
var firstsinimporte=parseFloat(this.totalsin)
var secondsinimporte=parseFloat(this.value[j].priceWithoutTaxes);
var finalsinimporte=secondsinimporte* parseInt(this.value[j].quantity);

if (!firstimporte)
      firstimporte = 0;
      if (!secondimporte)
      secondimporte = 0;

      if (!firstsinimporte)
      firstsinimporte = 0;
      if (!secondsinimporte)
      secondsinimporte = 0;

      if (!firstquantity)
      firstquantity = 0;
      if (!secondquantity)
      secondquantity = 0;

//for Quantity Sum
      var firstNum = parseInt(this.total) 
      var secondNum = parseInt(this.value[j].quantity);
     

      if (!firstNum)
        firstNum = 0;
      if (!secondNum)
        secondNum = 0;
        
debugger;
      this.quantity=firstquantity + secondquantity;
      this.exprice=firstimporte+finalimporte;
      this.totalsin=firstsinimporte+finalsinimporte;


    }
  }
  // var results = this.grobybydata.Where((s: { department: string; }) => s.department =='260');
  // var totalSum = results.Sum((x: { quantity: any; }) => (x.quantity));
  

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
