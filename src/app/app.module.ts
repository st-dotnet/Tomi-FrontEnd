import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './Components/layout/app-header/app-header.component';
import { AppFooterComponent } from './Components/layout/app-footer/app-footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerComponent } from './Components/customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './Components/layout/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helper';
import { UserComponent } from './Components/user/user.component';
import { StoreComponent } from './Components/store/store.component';
import { SharedModule } from './shared';
import { MiddleContentComponent } from './Components/layout/middle-content/middle-content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WorkloadsComponent } from './Components/workloads/workloads.component';
import { NgbModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkloadComponent } from './workload/workload.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    LoginComponent,
    CustomerComponent,
    UserComponent,
    StoreComponent,
    SidebarComponent,
    MiddleContentComponent,
    ForgotPasswordComponent,
    WorkloadsComponent,
    WorkloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    NgbDatepickerModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
