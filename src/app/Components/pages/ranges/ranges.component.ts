import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RangesService, UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Customer } from '@app/_models';
import { Toast, ToastrService } from 'ngx-toastr';

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
  groupSubmitted: boolean = false;
  groupList: any;
  isAddGroup = false;
  searchText: string = "";
  printDate = new Date();
  editRange: boolean = false;
  editGroup: boolean = false;
  maximumRange: any;
  rangeError: boolean= false;
  rangeErrorMessage: string="";
  tagformValue:  string = "";
  tagToValue:  string = "";
  storeName: any;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private rangesService: RangesService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.rangesService.rangeList.subscribe(user => this.rangeList = user);
    this.authenticationService.storeName.subscribe(user => this.storeName = user);
    this.rangeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      groupId: ['', Validators.required],
      tagTo: ['', Validators.required],
      tagFrom: ['', Validators.required],
    });
    this.groupForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
    this.getallRangeList();
    this.getallGroupList();
    this.getMaximumRange();
  }

  getallCustomList() {
    this.rangesService.getRangeList();
    this.rangesService.rangeList.subscribe(user => this.rangeList = user);
  }

  getMaximumRange(){
    this.rangesService.getMaximumRanges().subscribe({
      next: (event: any) => {
        this.maximumRange = event;
        if(this.maximumRange>0)
        this.rangeForm.controls["tagFrom"].setValue(this.maximumRange);
      }
    })
  }
  getallRangeList() {
    this.rangesService.getRangeLists().subscribe({
      next: (event: any) => {
        this.rangeList = event;
        this.spinner.hide();
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.rangeForm.controls; }
  get groupf() { return this.groupForm.controls; }

  open(content: any) {
    this.editRange = false;
    this.submitted = false;
    this.groupSubmitted = false;
    this.isAddGroup = false;
    this.rangeForm.reset();
    this.groupForm.reset();
    this.rangeForm.controls["groupId"].setValue("");
    if(this.maximumRange>0)
    this.rangeForm.controls["tagFrom"].setValue(this.maximumRange);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.getallRangeList();
    }, (reason) => {
    });
  }

  editmodel(content: any, item: any, name: string) {
    this.editRange = true;
    this.rangeError= false;
    if (name = "ranges") {
      this.rangeForm.controls["id"].setValue(item.id);
      this.rangeForm.controls["name"].setValue(item.name);
      this.rangeForm.controls["groupId"].setValue(item.groupId);
      this.rangeForm.controls["tagTo"].setValue(item.tagTo);
      this.rangeForm.controls["tagFrom"].setValue(item.tagFrom);
      this.tagformValue= this.rangeForm.value.tagFrom;
      this.tagToValue= this.rangeForm.value.tagTo;
    }
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.getallRangeList();
     }, (reason) => {
    });
  }

  opencreateGroup() {
    this.groupSubmitted = false;
    this.editGroup = false;
    this.groupForm.reset();
  }

  editgroup(item: any) {
    this.editGroup = true;
    this.groupForm.controls["id"].setValue(item.id);
    this.groupForm.controls["name"].setValue(item.name);
    this.isAddGroup = true;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.rangeForm.invalid || this.rangeError) {
      return;
    }

    this.loading = true;
    this.rangesService.addRange(this.rangeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.getallCustomList();
          this.getMaximumRange();
        }
      });
  }

  deleteRange(rangeId: any) {

    this.rangesService.deleteRange(rangeId).pipe(first())
      .subscribe({
        next: (res) => {
          if(res.error)
          this.toastrService.error(res.error);

          else

          this.getallCustomList();
          this.getMaximumRange();

        }

      });

  }

  onGroupSubmit() {
    this.groupSubmitted = true;
    if (this.groupForm.invalid) {
      return;
    }
    this.loading = true;
    this.rangesService.addGroup(this.groupForm.value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          if(res.error)
          this.toastrService.error(res.error);
          this.isAddGroup = false;
          this.editGroup = false;
          this.getallGroupList();
          this.getallRangeList();
        }
      });
  }

  deleteGroup(groupId: any) {
    this.rangesService.deleteGroup(groupId).pipe(first())
      .subscribe({
        next: (res) => {
          if(res.error)
          this.toastrService.error(res.error);
          else
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

  cancel() {
    this.isAddGroup = false;
    this.editGroup = false;
    this.submitted = false;
    this.groupSubmitted = false;
  }

  tagfromValue(){
    this.rangeError= false;
    if(this.editRange)
    {
      debugger;
      if(this.tagformValue!="" && this.tagToValue !=""&& this.rangeForm.value.tagFrom !=null && this.rangeForm.value.tagTo)
      {
        if(this.rangeForm.value.tagFrom>this.rangeForm.value.tagTo)
        { 
          this.rangeErrorMessage="Tag From is not greater than tag to value";
          this.rangeError = true;
        }
       if(this.rangeForm.value.tagFrom<this.tagformValue)
       {
        this.rangeErrorMessage="Tag From is not greater than tag to value";
        this.rangeError = true;
       }
     
      else if(this.rangeForm.value.tagFrom >this.tagformValue && this.rangeForm.value.tagFrom <this.tagToValue)
           this.rangeError= false;
      return;
      }
    }
    if(this.rangeForm.value.tagFrom !=null && this.rangeForm.value.tagTo&& this.rangeForm.value.tagFrom>this.rangeForm.value.tagTo)
      {
      this.rangeError = true;
      this.rangeErrorMessage="Tag From is not greater than tag to value";
      return;
      }
      if(this.rangeForm.value.tagFrom != null && this.maximumRange>this.rangeForm.value.tagFrom)
      { 
        this.rangeError= true;
        this.rangeErrorMessage='Tag From is not less than '+this.maximumRange;
        return;
      }   
    
    }
}
