import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared';
import { AuthFooterComponent } from '../layout/auth-layout/auth-footer/auth-footer.component';
import { AuthHeaderComponent } from '../layout/auth-layout/auth-header/auth-header.component';
import { MiddleContentComponent } from '../layout/auth-layout/middle-content/middle-content.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    MiddleContentComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    NgbDatepickerModule
  ]
})
export class AuthModule { }
