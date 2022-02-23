import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';

import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';

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
  constructor(private reportOptionLoadingServices:reportOptionLoadingServices,private authenticationService: UserService, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.getLabelInformation();
    this.authenticationService.storeName.subscribe(user => this.storeName = user);

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