import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RangesService, UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Customer } from '@app/_models';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.css']
})
export class RangesComponent implements OnInit {
  loading = false;
  submitted = false;
  ranges: any;
  rangeForm!: FormGroup;
  groupForm!: FormGroup;
  customers?: Customer[];
  p: number = 1;
  rangeList: any;
  groupsubmitted: boolean=false ;
  groupList: any;
  isAddGroup= false;
  searchText:any;
  printDate= new Date();
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private rangesService: RangesService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.rangesService.rangeList.subscribe(user => this.rangeList = user);
    this.rangeForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required],
      groupId:['',Validators.required],
      tagTo:['',Validators.required],
      tagFrom:['',Validators.required],
    });
    this.groupForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required],
    });
    this.getallRangeList();
    this.getallGroupList();
  }

  getallCustomList() {
    this.rangesService.getRangeList();
    this.rangesService.rangeList.subscribe(user => this.rangeList = user);
  }

  getallRangeList() {
    this.rangesService.getRangeLists().subscribe({
      next: (event: any) => {
        
        this.rangeList = event;
        this.spinner.hide();
      }
    });;
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.rangeForm.controls; }
  
  get groupf() { return this.groupForm.controls; }
  
  open(content: any) {
    this.rangeForm.controls["id"].setValue("");
    this.rangeForm.controls["name"].setValue("");
    this.rangeForm.controls["groupId"].setValue("");
    this.rangeForm.controls["tagTo"].setValue("");
    this.rangeForm.controls["tagFrom"].setValue("");
    this.rangeForm.controls["tagFrom"].setValue("");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.getallRangeList();

    }, (reason) => {
    });
  }
 editmodel(content:any, item:any,name:string){
   debugger;
if(name="ranges"){
  this.rangeForm.controls["id"].setValue(item.id);
  this.rangeForm.controls["name"].setValue(item.name);
  this.rangeForm.controls["groupId"].setValue(item.groupId);
  this.rangeForm.controls["tagTo"].setValue(item.tagTo);
  this.rangeForm.controls["tagFrom"].setValue(item.tagFrom);
  this.rangeForm.controls["tagFrom"].setValue(item.tagFrom);
}
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.getallRangeList();

  }, (reason) => {
  });

 }

 opencreateGroup(){

  this.groupForm.controls["id"].setValue("");
  this.groupForm.controls["name"].setValue("");
 }
 editgroup(item:any,){
  this.groupForm.controls["id"].setValue(item.id);
  this.groupForm.controls["name"].setValue(item.name);
 this.isAddGroup = true;
 }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.rangeForm.invalid) {
      return;
    }
    this.loading = true;
    this.rangesService.addRange(this.rangeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.getallCustomList();
        }
      });
  }
  deleteRange(rangeId:any){
    this.rangesService.deleteRange(rangeId)  .pipe(first())
    .subscribe({
      next: () => {
     
        this.getallCustomList();
      }
    });
    
  }
  onGroupSubmit() {
    this.groupsubmitted = true;
    if (this.groupForm.invalid) {
      return;
    }
    this.loading = true;
    this.rangesService.addGroup(this.groupForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.isAddGroup= false;
        //  this.modalService.dismissAll();
          this.getallGroupList();
        }
      });
  }
  deleteGroup(groupId:any){
    this.rangesService.deleteGroup(groupId)  .pipe(first())
    .subscribe({
      next: () => {
        this.getallGroupList();
      }
    });
    
  }

  getallGroupList() {
    this.rangesService.getGroupLists().subscribe({
      next: (event: any) => {
        
        this.groupList = event;
        this.spinner.hide();
      }
    });;
  
  }
  
}
