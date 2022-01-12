import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/_models';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {



  customerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  p: number = 1;
  customers?:Customer[];
  stockList:any;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: UserService,
      private spinner: NgxSpinnerService,
      private modalService: NgbModal
      
  ) { 
    
  }

  ngOnInit() {
    this.authenticationService.stockList.subscribe(user => this.stockList = user);;
    this.spinner.show();
      this.customerForm = this.formBuilder.group({
        name: ['', Validators.required] 
      });
      this.getallCustomList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }


  getallCustomList(){
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
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
      if (this.customerForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticationService.addCustomer(this.customerForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.modalService.dismissAll();
            this.getallCustomList();
          } 
      });
  }

  manageUser(customerId:any){
    this.router.navigate([`user/${customerId}`]);
  }
  manageStore(customerId:any){
    this.router.navigate([`store/${customerId}`]);
  }
}