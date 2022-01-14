import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  stores :any;
  store: any;
  customerId: any;
  storeForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { 
      this.activatedRoute.params.subscribe((params: Params) => {
        this.customerId = params['id'];
        this.getAllStoreByCustomerId(this.customerId);
      });
    }

  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required] 
    });
  }
  get f() { return this.storeForm.controls; }
  getAllStoreByCustomerId(customerId:any){
    this.spinner.show();
    this.authenticationService.getAllStoreByCustomerId(customerId).subscribe(result => {
      if(result){
        this.stores = result.store;
      }
      this.spinner.hide();
    });
  }
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
    }, (reason) => {
    });
  } 
  onSubmit() {
      this.submitted = true;

      if (this.storeForm.invalid) {
          return;
      }
      this.store = this.storeForm.value;
      this.store.customerId=this.customerId;
      this.loading = true;
      this.authenticationService.addStore(this.store)
      .pipe(first())
      .subscribe({
          next: () => {
            this.modalService.dismissAll();
            this.getAllStoreByCustomerId(this.customerId);
          }
        
      });

  }
}
