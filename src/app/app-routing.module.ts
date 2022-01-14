import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_helper/auth.guard';


const authModule = () => import('./Components/auth/auth.module').then(x => x.AuthModule);
const pagesModule = () => import('./Components/pages/pages.module').then(x => x.PageModule);

const routes: Routes = [
  { path: '', loadChildren: authModule, },
  { path: '', loadChildren: pagesModule, canActivate: [AuthGuard] },

  // otherwise redirect on the basis of authentication
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [HttpClientModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
