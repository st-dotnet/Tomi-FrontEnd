import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RangesService, UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-range',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.css']
})
export class RangeComponent implements OnInit {

  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  storeName: any;
  constructor(private formbuilder:FormBuilder, private modalService:NgbModal,private rangesService: RangesService,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.userService.storeName.subscribe(user => this.storeName = user);

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
}
  getLabelInformation(){
    this.spinner.show();
    this.rangesService.getRangeLists()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        this.spinner.hide();
       this.reportList=response;
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
}