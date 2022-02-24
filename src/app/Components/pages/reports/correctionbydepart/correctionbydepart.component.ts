import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-correctionbydepart',
  templateUrl: './correctionbydepart.component.html',
  styleUrls: ['./correctionbydepart.component.css']
})
export class CorrectionbydepartComponent implements OnInit {
  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  year: any;
  storeName: any;
  form: FormGroup;
  modalClass: string | undefined;
  departments: any;

  constructor(private formbuilder:FormBuilder, private modalService:NgbModal,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService,private fb: FormBuilder) {
    this.getLabelInformation();
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
    this.userService.stockDate.subscribe(user => this.year = user);
    this.userService.storeName.subscribe(user => this.storeName = user);
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
    this.reportOptionLoadingServices.getCorrectionsReportInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        debugger
       this.reportList=response;
       this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];       
       this.spinner.hide();
      }
    });
  }

  filterDepartment(){
   
     this.reportOptionLoadingServices.getCorrectionsReportInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
       this.reportList=response;
       this.departments = [...new Set(response.map((x: { department: any; }) => x.department))];       
       this.spinner.hide();
       let s = this.form.value.checkArray;
       var result = this.reportList.filter(function(e:any) {
        return [s].includes(e.department.toString())
      });
      this.reportList = result;
      this.modalService.dismissAll();
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
      this.modalClass = 'mymodal',
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'modal-filteradd'
      }).result.then((result) => {
      }, (reason) => {
      });
    }
    onCheckboxChange(e:any) {
      const checkArray: any = this.form.get('checkArray') as FormArray;
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
}
