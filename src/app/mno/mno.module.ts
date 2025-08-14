import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnoRoutingModule } from './mno-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ApprovalsComponent,
    ReportsComponent,
    SettingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MnoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class MnoModule { }