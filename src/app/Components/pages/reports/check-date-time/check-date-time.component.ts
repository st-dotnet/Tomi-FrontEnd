import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-check-date-time',
  templateUrl: './check-date-time.component.html',
  styleUrls: ['./check-date-time.component.css']
})
export class CheckDateTImeComponent implements OnInit {
  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  year: any;
  stockDate: Date = new Date();
  from_date: any;
  to_date: any;
  storeAddress: any;
  total: number | any;
  quantity: number | any;
  value:any=[];
  soh: number| any;
  exprice: number| any;
  totalsin: number| any;
  length:  number| any;
  constructor(private formbuilder:FormBuilder,   private authenticationService: UserService,private modalService:NgbModal,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.getLabelInformation();
   }

  ngOnInit(): void 
  {
    this.authenticationService.stockDate.subscribe((date: Date) => {
      debugger
        this.stockDate.setDate(date.getDate() - 1);
    });
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.storeAddress.subscribe(user => this.storeAddress = user);
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
  getLabelInformation(){
    this.spinner.show();
  
    this.reportOptionLoadingServices.getCheckDateTimeInformation()
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
      this.length=data.length;
    for(let j=0;j<data.length;j++)
    {   
      debugger;
      //for Quantity Price
      var firstquantity=parseFloat(this.quantity)
      var secondquantity=parseFloat(this.value[j].quantity);

// for Importe Total
var firstimporte=parseFloat(this.exprice)
var finalimporte= parseInt(this.value[j].orderJob.salePrice);

if (!firstquantity)
      firstquantity = 0;
      if (!secondquantity)
      secondquantity = 0; 

      if (!firstimporte)
      firstimporte = 0;
      if (!finalimporte)
      finalimporte = 0; 

debugger;
      this.quantity=firstquantity + secondquantity;
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
    filterBydate(){
      const fromdate =this.from_date;
      const todate = this.to_date;
      if(fromdate ==null || todate ==null){
      this.toastrService.error("Please select  dates vlaues ");
      }
      else{

      }
    }
    
}
