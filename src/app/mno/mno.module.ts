import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnoRoutingModule } from './mno-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ApprovalsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    MnoRoutingModule
  ]
})
export class MnoModule { }
