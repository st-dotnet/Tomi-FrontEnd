import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
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
  selector: 'app-summaryby-department',
  templateUrl: './summaryby-department.component.html',
  styleUrls: ['./summaryby-department.component.css']
})
export class SummarybyDepartmentComponent implements OnInit {

  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  stockDate: Date = new Date();
  items: any;
  modalClass: string | undefined;
  departments: any;
  form: FormGroup ;
  constructor(private formbuilder:FormBuilder, private modalService:NgbModal,private authenticationService: UserService,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) 
  {
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
    this.reportOptionLoadingServices.getUncountedItemsInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        console.log("response : ",response);
        this.spinner.hide();
       this.reportList=response;
       this.departments = [...new Set(response.map((x: { department: any; }) => x.department))]; 
      }
    });
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
      this.reportOptionLoadingServices.getUncountedItemsInformation()
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