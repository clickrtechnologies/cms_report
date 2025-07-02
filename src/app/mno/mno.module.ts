import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnoRoutingModule } from './mno-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ApprovalsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    MnoRoutingModule,
    FormsModule

  ]
})
export class MnoModule { }