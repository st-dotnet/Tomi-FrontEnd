import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './Components/customer/customer.component';
import { UserComponent } from './Components/user/user.component';
import { StoreComponent } from './Components/store/store.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WorkloadsComponent } from './Components/workloads/workloads.component';
import { MasterComponent } from './Components/master/master.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'customer', component:CustomerComponent},
  {path:'user/:id', component:UserComponent},
  {path:'store/:id', component:StoreComponent},
  {path:'user/:id/:storeId', component:UserComponent},
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'workorders', component: WorkloadsComponent },
  { path: 'workorders/:id', component: WorkloadsComponent},
  {path:'master',component: MasterComponent}
];

@NgModule({
  imports: [HttpClientModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
