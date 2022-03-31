import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MustMatch } from '@app/_helper/must-match.validator';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   customerId?: string;
   users?:User[];
  customerName: any;
   StoreId?:string;
  userForm!: FormGroup;
  user:any;
  submitted = false;
  constructor( private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.customerId = params['id'];
      this.getAllUserByCustomerId(this.customerId);
    });
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      // customerId: ['', Validators.required],
      // storeId : ['', Validators.required],
     },{
       validator: MustMatch('password', 'confirmPassword'),
    }
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  getAllUserByCustomerId(customerId:any){
    this.authenticationService.getAllUserByCustomerId(customerId).subscribe(result => {
      if(result){
        this.users = result.users;
        this.customerName =result.name;
       
      }
      this.spinner.hide();
    }) 
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
    }, (reason) => {
    });
  } 
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    this.user = this.userForm.value;
    this.user.customerId=this.customerId;
    this.user.role = "CustomerAdmin";
    this.authenticationService.addUser(this.user)
    .pipe(first())
    .subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.getAllUserByCustomerId( this.customerId);
        }
    });
}
}
