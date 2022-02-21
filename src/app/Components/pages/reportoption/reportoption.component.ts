import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { reportOptionLoadingServices } from '@app/_services/reportOptionLoadingServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';


@Component({
  selector: 'app-getLabelDetailsOption',
  templateUrl: './reportoption.component.html',
  styleUrls: ['./reportoption.component.css']
 

})
export class reportOptionComponents implements OnInit 
{
  reportOptionLoadingServicesform!:FormGroup;
  reportList: any;
  p: number = 1;
  options:any;
  constructor(private formbuilder:FormBuilder, private modalService:NgbModal,private reportOptionLoadingServices:reportOptionLoadingServices, private spinner: NgxSpinnerService,private toastrService: ToastrService,private userService:UserService ) { }

  ngOnInit(): void 
  {
 // this.getLabelInformation()
  this.reportOptionLoadingServicesform=this.formbuilder.group({
  Terminal: ['', Validators.required],
  Tx:['',Validators.required],
  Employee:['',Validators.required],
  datetime:['',Validators.required],
  qty:['',Validators.required],
  Total:['',Validators.required],
  DownloadError:['']
})

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
    this.reportOptionLoadingServices.getLabelDetailsInformation()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        this.spinner.hide();
       this.reportList=response;
      }
    });
  }
}
