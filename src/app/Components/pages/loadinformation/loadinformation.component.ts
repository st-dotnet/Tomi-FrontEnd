import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '@app/_services';
import { loadingformationService } from '@app/_services/informationLoading.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { convertTypeAcquisitionFromJson } from 'typescript';

@Component({
  selector: 'app-loadinformation',
  templateUrl: './loadinformation.component.html',
  styleUrls: ['./loadinformation.component.css']
})
export class LoadinformationComponent implements OnInit {
  loading = false;
  spinner: any;
  customerId: any;
  storeName: any;
  year: any;
  informationList: any;
  informationLoadingform!:FormGroup;
  storeId: any;
  modalcontentList: any;
  modalFirstoptionDetailsData: any;
  modalSecondoptionDetailsData: any;
  tempempName: any;
  value:any=[];
  closeResult: any;
  tagForm!: FormGroup;
  tagSubmitted: boolean = false;
  paramEmpnumber: any;
  paramTag:any;
  paramTerminal:any;
  formBuilder: any;
  paramOrignalEmpNumber: string | undefined;
  paramOriginalTerminal: string | undefined;
  paramOriginalTag: string | undefined;
  temptagInfo: any;
  constructor(private modalService: NgbModal,private loadingformationService:loadingformationService, 
    private toastrService: ToastrService, 
    private authenticationService: UserService) {
    }
  ngOnInit(): void 
  {
    this.authenticationService.customerId.subscribe(user => this.customerId = user);
    this.authenticationService.storeId.subscribe(user => this.storeId = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.authenticationService.stockDate.subscribe(user => this.year = user);
  }
  generateRecordMFSummary(){
    debugger;
    this.loadingformationService.GenerateInformationLoading()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
       this.informationList=response;
        this.modalService.dismissAll();
      }
    });
  }
terminalForFirstExisting(tagId:any,empNumber:any)
{
  debugger;
  this.loadingformationService.getterminalsummaryforfirstdetails(tagId,empNumber)
  .pipe(first())
  .subscribe({
    next: (response: any) => {
      debugger;
     this.modalFirstoptionDetailsData=response;
    }
  });
}
 terminalForSecondExisting(tagId:any,empNumber:any)
 {
   debugger;
   this.loadingformationService.getterminalsummaryforseconddetails(tagId,empNumber)
   .pipe(first())
   .subscribe({
     next: (response: any) => {
       debugger;
      this.modalSecondoptionDetailsData=response;
     }
   });
 }
open(content:any,tagId:any) {
  debugger;
  this.temptagInfo=tagId;
    this.loadingformationService.getTerminalSummmaryByTag(tagId)
    .pipe(first())
    .subscribe({
      next: (response: any) => 
            {
                          this.modalcontentList=response;
                          this.findsum(response,tagId);
                          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',windowClass: 'modal-loadinfo' }).result.then((result) => {
                          }, (reason) => {
                         });
            }
          });
  }
 mergeNewRecords()
 {
    debugger;
    //for new TAG 
    const newempNumber =  document.getElementById('printfirstEmplNumberSection')?.innerHTML;
    const newterminal = document.getElementById("printfirstTerminalSection")?.innerHTML;
    const tagId=document.getElementById("printTabSection")?.innerHTML;

    this.paramEmpnumber=newempNumber;
    this.paramTerminal=newterminal;
    this.paramTag=tagId;
    //for original TAG

    const orginalempNumber =  document.getElementById('printsecondEmplNumberSection')?.innerHTML;
    const orginalterminal = document.getElementById("printsecondTerminalSection")?.innerHTML;
    const orginaltagId=document.getElementById("printTabSection")?.innerHTML;

    this.paramOrignalEmpNumber= orginalempNumber;
    this.paramOriginalTerminal=orginalterminal;
    this.paramOriginalTag=orginaltagId;

        const modelparam = 
        {
          terminal : this.paramTerminal,
          empnumber: this.paramEmpnumber,
          tag:this.paramTag,
          EmpNumberOriginal:this.paramOrignalEmpNumber,
          TerminalOriginal:this.paramOriginalTerminal
        }
        this.loadingformationService.mergeNewRecords(modelparam)
        .pipe(first())
        .subscribe({
          next: (res) => 
          {
            if(res.error)
                this.toastrService.error(res.error);
                else
            this.modalService.dismissAll();
            this.generateRecordMFSummary();
          }
        });
  }
  findsum(data:any[],tagId:any) 
  {
    debugger;
    this.value=data ; 
    for(let j=0;j<data.length;j++)
    {
      if(j==0)
     {
      var tempemployeNumber=this.value[j].employeeNumber;
      var tempTag=tagId;
      this.terminalForFirstExisting(tempTag,tempemployeNumber);
     }
     if(j==1)
     {
      var tempemployeNumber=this.value[j].employeeNumber;
      var tempTag=tagId;
      this.terminalForSecondExisting(tempTag,tempemployeNumber)
     }
    }
  }
keepOriginalChange()
{
  debugger;
  const empNumber =  document.getElementById('printfirstEmplNumberSection')?.innerHTML;
  const terminal = document.getElementById("printfirstTerminalSection")?.innerHTML;
  const tagId=document.getElementById("printTabSection")?.innerHTML;
  this.loadingformationService.getterminalsummaryKeepOriginal(tagId,empNumber,terminal)
  .pipe(first())
  .subscribe({
    next: (res) => {
      this.modalService.dismissAll();
      this.generateRecordMFSummary()
      if(res.error)
      this.toastrService.error("Records are not selected.");
    }
  });
}
 keepNewChange()
 {
  debugger;
  const empNumber =  document.getElementById('printsecondEmplNumberSection')?.innerHTML;
  const terminal = document.getElementById("printsecondTerminalSection")?.innerHTML;
  const tagId=document.getElementById("printTabSection")?.innerHTML;
  this.loadingformationService.getterminalsummaryKeepOriginal(tagId,empNumber,terminal)
  .pipe(first())
  .subscribe({
    next: (res) => {
      this.modalService.dismissAll();
      this.generateRecordMFSummary()
      if(res.error)
      this.toastrService.error("Records are not selected.");
    }
  });
 }
 renumberTag(renumberContect: any) {
  {
    this.tagSubmitted = false;
    debugger;
    this.modalService.open(renumberContect, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
onClickSubmit(data: { tag: string; })
{
   debugger;
   if(data.tag==null)
   {
     return;
   }
  const empNumber =  document.getElementById('printfirstEmplNumberSection')?.innerHTML;
  const terminal = document.getElementById("printfirstTerminalSection")?.innerHTML;
  const tagId=document.getElementById("printTabSection")?.innerHTML;
  this.paramEmpnumber=empNumber;
  this.paramTerminal=terminal;
  this.paramTag=tagId;
  const model = {
    terminal : this.paramTerminal,
    empnumber: this.paramEmpnumber,
    newTag:data.tag,
    tag:this.paramTag
  }
  this.loadingformationService.updateTag(model)
  .pipe(first())
  .subscribe({
    next: (res) => 
    {
      if(res.error)
          this.toastrService.error(res.error);
          else
      this.modalService.dismissAll();
      this.generateRecordMFSummary()

    }
  });
}

  getDismissReason(reason: any) 
  {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

  // open(content: any, tagId: any) {
  //   debugger;
  //   this.loadingformationService.getTerminalSummmaryByTag(tagId)
  //   .pipe(first())
  //   .subscribe({
  //     next: (response: any) => {
  //   this.modalService.open(response, { ariaLabelledBy: 'modal-basic-title',windowClass: 'modal-loadinfo' }).result.then((result) => {  
  //   }, (reason) => {
  //   });
  // }});
  // }
  // generateRecordMFSummary(){
  //   debugger;
  //   this.spinner.show();
  //   this.loadingformationService.GenerateInformationLoading()
  //   .pipe(first())
  //   .subscribe({
  //     next: (response: any) => {
  //      this.reportInformationLoadingList=response;
  //      console.log(response);
  //      this.spinner.hide();
  //       this.modalService.dismissAll();
  //     }
  //   });
  // }
  // generateRecordMFSummary(){
  //   debugger;
  //   this.spinner.show();
  //   // if (this.customerId && this.storeName && this.year)
  //   //  {
  //   //   const formData: FormData = new FormData();
  //   //   var event = new Date(this.year);
  //   //   let date = JSON.stringify(event)
  //   //   date = date.slice(1, 11)
  //   //   formData.append('storeId', this.storeId);
  //   //   formData.append('customerId', this.customerId);
  //   //   formData.append('stockDate', date);
  //   //   formData.append('storeName', this.storeName);
  //     // debugger;
  //     // this.loadinformationService.GenerateInformationLoading(formData)
  //     debugger;
  //     this.loadinformationService.GenerateInformationLoading()
  //     .pipe(first())
  //     .subscribe({
  //       next: (response: any) => {
  //         this.spinner.hide();
  //        this.reportInformationLoadingList=response;
  //       }
  //     });
  //   } 
    // else 
    // {
    //   this.toastrService.error("Please Select the Customer, Store and Date")
    // }
  //}
//}
