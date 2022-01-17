import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/_services';
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
  customerForm!: FormGroup;
  customers?: Customer[];
  
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.authenticationService.stockList.subscribe(user => this.ranges = user);
  }

  getallCustomList() {
    this.authenticationService.getCustomerList().subscribe(result => {
      this.customers = result;
      this.spinner.hide();
    })
  }

  
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

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

}
