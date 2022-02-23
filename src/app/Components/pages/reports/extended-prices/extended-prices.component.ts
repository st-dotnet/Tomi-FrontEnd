import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';

import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-extended-prices',
  templateUrl: './extended-prices.component.html',
  styleUrls: ['./extended-prices.component.css']
})
export class ExtendedPricesComponent implements OnInit {
  reportList: any;
  p: number = 1;
  options:any;
  printDate = new Date();
  constructor(private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) {
    this.getLabelInformation();
    }

  ngOnInit(): void 
  {
  this.options = {
  fieldSeparator: '',
  quoteStrings: '',
  decimalseparator: '.',
  showLabels: false,
  showTitle: false,
  useBom: false,
  noDownload: false,
  useHeader: false,
  nullToEmptyString: true,
   }
 }
 
  getLabelInformation(){
    this.spinner.show();
    this.reportOptionLoadingServices.getExtendedPricesInformation()
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
