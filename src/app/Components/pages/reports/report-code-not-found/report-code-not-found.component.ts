import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';

import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-code-not-found',
  templateUrl: './report-code-not-found.component.html',
  styleUrls: ['./report-code-not-found.component.css']
})
export class ReportCodeNotFoundComponent implements OnInit {

  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  year: any;
  stockDate: Date = new Date();
  form: FormGroup;
  departments: any;
  modalClass: string | undefined;
  items:any=[]
  //total: any;
  value:any=[];
  total: number | any;
  price: number | any;
  constructor(private modalService:NgbModal,private formbuilder:FormBuilder ,private reportOptionLoadingServices:reportOptionLoadingServices,private authenticationService: UserService, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.getLabelInformation();
    this.form = this.formbuilder.group({
      checkArray: this.formbuilder.array([])
    })
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe((date: Date) => {
      debugger
      // this.stockDate =  date.setDate(date.getDate() - 1);
      this.stockDate.setDate(date.getDate() - 1);
    });
   }

  ngOnInit(): void 
  {
 // this.getLabelInformation()
//   this.reportOptionLoadingServicesform=this.formbuilder.group({
//   Terminal: ['', Validators.required],
//   Tx:['',Validators.required],
//   Employee:['',Validators.required],
//   datetime:['',Validators.required],
//   qty:['',Validators.required],
//   Total:['',Validators.required],
//   DownloadError:['']
// })

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
    this.reportOptionLoadingServices.getCodeNotFoundInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
       this.findsum(response);  
        this.spinner.hide();
       this.reportList=response;
       this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];   
      }
    });
  }
  findsum(data:any[])
  { 
      this.value=data     
      for(let j=0;j<data.length;j++)
    {   
      debugger;
      var firstprice=parseFloat(this.price)
      var secondprice=parseFloat(this.value[j].orderJob.salePrice);
      
      if (!firstprice)
        firstprice = 0;
      if (!secondprice)
         secondprice = 0;

      var firstNum = parseInt(this.total) 
      var secondNum = parseInt(this.value[j].quantity);
      if (!firstNum)
        firstNum = 0;
      if (!secondNum)
        secondNum = 0;
      this.total = firstNum + secondNum;
      this.price=firstprice + secondprice;
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
      console.log("departments",this.departments)
      this.items=[];
      this.modalClass = 'mymodal',
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'modal-filteradd'
      }).result.then((result) => {
      }, (reason) => {
      });
    }
    onCheckboxChange(e:any) {
      if (e.target.checked) {

        const index = this.items.findIndex((x:any) => x.value === e.target.value);

        if(index==-1){

          this.items.push(new FormControl(e.target.value));
        }
      } else {

         const index = this.items.findIndex((x:any) => x.value === e.target.value);

         this.items.removeAt(index);

      }

    }
    filterDepartment(){
      this.reportOptionLoadingServices.getCodeNotFoundInformation()
     .pipe(first())
     .subscribe({
       next: (response: any) => {
        this.reportList=response;
        console.log("res",response)
        this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];       
        this.spinner.hide();
        const myArrayFiltered = this.reportList.filter((array:{ department: any; } ) => this.items.some((filter:any ) => filter.value === array.department.toString()));
       this.reportList = myArrayFiltered;
       this.modalService.dismissAll();
       }
       
     });
 
   }
}