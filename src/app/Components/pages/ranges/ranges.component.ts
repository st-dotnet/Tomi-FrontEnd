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
      name: ['', Validators.required],
      group:['',Validators.required],
      tagTo:['',Validators.required],
      tagFrom:['',Validators.required],
    });
    this.groupForm = this.formBuilder.group({
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
        debugger;
        this.rangeList = event;
        this.spinner.hide();
      }
    });;
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.rangeForm.controls; }
  
  get groupf() { return this.groupForm.controls; }
  open(content: any) {
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {


    }, (reason) => {
    });
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
    debugger;
    this.rangesService.deleteRange(rangeId)  .pipe(first())
    .subscribe({
      next: () => {
     
        this.getallCustomList();
      }
    });
    
  }
  onGroupSubmit() {
    this.groupsubmitted = true;
    // stop here if form is invalid
    if (this.groupForm.invalid) {
      return;
    }
    this.loading = true;
    this.rangesService.addGroup(this.groupForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.getallCustomList();
        }
      });
  }
  deleteGroup(groupId:any){
    debugger;
    this.rangesService.deleteGroup(groupId)  .pipe(first())
    .subscribe({
      next: () => {
     
        this.getallCustomList();
      }
    });
    
  }

  getallGroupList() {
    this.rangesService.getGroupLists().subscribe({
      next: (event: any) => {
        debugger;
        this.groupList = event;
        this.spinner.hide();
      }
    });;
  
  }
  
}
