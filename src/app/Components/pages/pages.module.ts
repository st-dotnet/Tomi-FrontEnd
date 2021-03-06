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
import { AdjustmentsinventoryComponent } from './adjustmentsinventory/adjustmentsinventory.component';
import { ProgramTerminalComponent } from './program-terminal/program-terminal.component';
import { Angular2CsvModule } from 'angular2-csv';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { ReservedComponent } from './reserved/reserved.component';
import { ParametersbydepartmentComponent } from './parametersbydepartment/parametersbydepartment.component';
import { LoadinformationComponent } from './loadinformation/loadinformation.component';
import { DatePipe } from '@angular/common'
import { ReportCodeNotFoundComponent } from './reports/report-code-not-found/report-code-not-found.component';
import { reportOptionComponents } from './reports/reportoption/reportoption.component';
import { ExtendedPricesComponent } from './reports/extended-prices/extended-prices.component';
import { VariationbySKUComponent } from './reports/variationby-sku/variationby-sku.component';
import { SummarybyDepartmentComponent } from './reports/summaryby-department/summaryby-department.component';
import { CorrectionbydepartComponent } from './reports/correctionbydepart/correctionbydepart.component';
import { DepsummaryComponent } from './reports/depsummary/depsummary.component';
import { CheckDateTImeComponent } from './reports/check-date-time/check-date-time.component';
import { CustomerReportsComponent } from './reports/customer-reports/customer-reports.component';
import { BillingReportComponent } from './reports/billing-report/billing-report.component';
import { ValidationReportComponent } from './reports/validation-report/validation-report.component';
import { TagsNotCountedComponent } from './reports/tags-not-counted/tags-not-counted.component';
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
    AdjustmentsinventoryComponent,
    ProgramTerminalComponent,
    DepartmentComponent,
    CategoryComponent,
    ReservedComponent,
    ParametersbydepartmentComponent,
    LoadinformationComponent,
    reportOptionComponents,
    ReportCodeNotFoundComponent,
    ExtendedPricesComponent,
    VariationbySKUComponent,
    SummarybyDepartmentComponent,
    CorrectionbydepartComponent,
    DepsummaryComponent,
    CheckDateTImeComponent,
    CustomerReportsComponent,
    BillingReportComponent,
    ValidationReportComponent,
    TagsNotCountedComponent
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
    Ng2SearchPipeModule,
    Angular2CsvModule,
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},DatePipe],
  bootstrap: [AppComponent]
})
export class PageModule { }
