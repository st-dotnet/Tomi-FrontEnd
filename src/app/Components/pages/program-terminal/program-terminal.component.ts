import { Component, OnInit } from '@angular/core';
import { SessionService, StockAdjustmentService } from '@app/_services';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-program-terminal',
  templateUrl: './program-terminal.component.html',
  styleUrls: ['./program-terminal.component.css']
})
export class ProgramTerminalComponent implements OnInit {

  uniqKey:any;
  isgenrateFile:boolean=false;
  options:any;
  options2:any;
  data:any[]=[];
  constructor( private stockadjustment: StockAdjustmentService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private accountService: SessionService) { }

  ngOnInit(): void {
    this.options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    showTitle: false,
    useBom: false,
    noDownload: false,
    useHeader: true,
    headers: ["sku", "department", "retailPrice"],
    nullToEmptyString: true,
    };

    this.options2 = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      useBom: false,
      noDownload: false,
      useHeader: true,
      headers: ["department"],
      nullToEmptyString: true,
      };
    const user = this.accountService.userValue;
    this.genratecsvFiles(user.user.customerId);
    //this.genratecsvFiles("B74DDD14-6340-4840-95C2-DB12554843E8");

  }

  genratekey(){
    this.uniqKey = Guid.create();
  }

  genrateFiles(){
    debugger;
    if(this.data.length>0)
    {
    this.isgenrateFile=true;
    new AngularCsv(this.data,'MF1.csv',this.options);
    new AngularCsv(this.data,'MF2.csv',this.options2);
    this.isgenrateFile=false;
    }
    else{
      this.toastrService.error("Data Not Found.");
      this.isgenrateFile=false;
    }
  }

  genratecsvFiles(custid:any){
    this.spinner.show();
     this.stockadjustment.getAdjustmentByCustomerId(custid).subscribe((response=>{
       this.data=response;
      console.log(response);
       this.spinner.hide();
     }));
  }
}
