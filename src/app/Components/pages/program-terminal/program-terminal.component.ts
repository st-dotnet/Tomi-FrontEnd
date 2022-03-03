import { Component, OnInit } from '@angular/core';
import { SessionService, StockAdjustmentService, UserService } from '@app/_services';
import { generateMF1Service } from '@app/_services/program-terminal.service';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-program-terminal',
  templateUrl: './program-terminal.component.html',
  styleUrls: ['./program-terminal.component.css']
})
export class ProgramTerminalComponent implements OnInit {

  uniqKey:any;
  operation: any = 1;
  isgenrateFile:boolean=false;
  options:any;
  options2:any;
  data:any[]=[];
  customerId: undefined;
  storeId: undefined;
  stockyear: undefined; 
  constructor( private stockadjustment: StockAdjustmentService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private accountService: SessionService, private authenticationService: UserService
    ,private generateFilesService:generateMF1Service) { }

  ngOnInit(): void {
    this.options = {
    fieldSeparator: ' ',
    quoteStrings: '',
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
      fieldSeparator: ' ',
      quoteStrings: '',
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
    this.uniqKey = Math.floor(Math.random() * 1000000);
  }

  // genrateFiles(){
  // //   this.authenticationService.customerId.subscribe(user => this.customerId = user);
  // //   this.authenticationService.storeId.subscribe(user => this.storeId = user);
  // //   this.authenticationService.stockDate.subscribe(user => this.stockyear = user);
  // //   if (this.customerId==undefined || this.storeId==undefined || this.stockyear ==undefined)
  // //   this.toastrService.error("Please select job order first");
  // //  else if(this.data.length>0)
  // //   {
  // //   this.isgenrateFile=true;
  // //   new AngularCsv(this.data,'TerminalSMF.csv',this.options);
  // //   new AngularCsv(this.data,'TerminalDepartments .csv',this.options2);
  // //   this.isgenrateFile=false;
  // //   }
  // //   else{
  // //     this.toastrService.error("Data Not Found.");
  // //     this.isgenrateFile=false;
  // //   }


  // }

  genrateFiles() {
    debugger
    this.spinner.show();
    const model = {
      operation : this.operation,
      inventoryKey: this.uniqKey
    }

    this.generateFilesService.GenerateMF1Information(model)
      .subscribe({
       next: (response: any) => {
         this.spinner.hide();
         this.data=response;
       }
     });
  }


  getAction(value: any){
    debugger
    this.operation = value;
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
