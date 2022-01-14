import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MiddleContentComponent } from '../layout/auth-layout/middle-content/middle-content.component';

const routes: Routes = [
{
  path: '',
  component: MiddleContentComponent,
  children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }
  ]
}
];

@NgModule({
  imports: [HttpClientModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
