import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService, UserService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  isLoggedIn= false;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: UserService,
      private toastrService: ToastrService,
      private accountService: SessionService
  ) { 
    const user = this.accountService.userValue;
     this.isLoggedIn = user && user.token;
      // redirect to home if already logged in
    //   if (this.authenticationService.currentUserValue) { 
    //       this.router.navigate(['/']);
    //   }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (!res.token) {
            this.toastrService.error(res.error);
            return;
          }
          this.router.navigate(["/customer"]).then(() => {
            window.location.reload();
          });
       
          // this.spinner.hide();         
        },
        error: error => {
         
          this.toastrService.error();
          this.loading = false;
        }

   
      });
  }
}