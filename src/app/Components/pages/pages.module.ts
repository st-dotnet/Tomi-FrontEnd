import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { JwtInterceptor } from '@app/_helper';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { AppFooterComponent } from '../layout/pages-layout/app-footer/app-footer.component';
import { AppHeaderComponent } from '../layout/pages-layout/app-header/app-header.component';
import { MiddleContentComponent } from '../layout/pages-layout/middle-content/middle-content.component';
import { SidebarComponent } from '../layout/pages-layout/sidebar/sidebar.component';
import { SharedModule } from '../shared';
import { CustomerComponent } from './customer/customer.component';
import { MasterComponent } from './master/master.component';
import { PageRoutingModule } from './pages-routing.module';
import { StocklistComponent } from './stocklist/stocklist.component';
import { StoreComponent } from './store/store.component';
import { UserComponent } from './user/user.component';
import { WorkloadsComponent } from './workloads/workloads.component';
import { RangesComponent } from './ranges/ranges.component';
import {NgxPrintModule} from 'ngx-print';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchFilterPipe } from './search-filter.pipe';
@NgModule({
  declarations: [
    CustomerComponent,
    UserComponent,
    StoreComponent,
    SidebarComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MiddleContentComponent,
    ForgotPasswordComponent,
    WorkloadsComponent,
    MasterComponent,
    StocklistComponent,
    RangesComponent,
    SearchFilterPipe,
  ],
  imports: [
    PageRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    NgbDatepickerModule,
    NgxPrintModule,
    Ng2SearchPipeModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class PageModule { }
