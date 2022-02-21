import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { CustomerComponent } from './customer/customer.component';
import { MasterComponent } from './master/master.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { StoreComponent } from './store/store.component';
import { UserComponent } from './user/user.component';
import { WorkloadsComponent } from './workloads/workloads.component';
import { MiddleContentComponent } from '../layout/pages-layout/middle-content/middle-content.component';
import { AdjustmentsinventoryComponent } from './adjustmentsinventory/adjustmentsinventory.component';
import { ProgramTerminalComponent } from './program-terminal/program-terminal.component';
import { reportOptionComponents } from './reportoption/reportoption.component';
import { ReportCodeNotFoundComponent } from './report-code-not-found/report-code-not-found.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'master',
  pathMatch: 'full'
},
{
  path: '',
  component: MiddleContentComponent,
  children: [
    { path: 'customer', component: CustomerComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'store/:id', component: StoreComponent },
    { path: 'user/:id/:storeId', component: UserComponent },
    { path: 'reset-password', component: ForgotPasswordComponent },
    // { path: 'workorders', component: WorkloadsComponent },
    { path: 'workorders/:id', component: WorkloadsComponent },
    { path: 'master', component: MasterComponent },
    { path: 'stockList', component: StocklistComponent },
    {path:'adjustmentsinventory',component: AdjustmentsinventoryComponent },
    {path:'program',component: ProgramTerminalComponent },
    {path:'reportoption',component:reportOptionComponents},
    {path:'reportcode',component:ReportCodeNotFoundComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
