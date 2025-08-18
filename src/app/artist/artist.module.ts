import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ApprovalsComponent,
    ReportsComponent,
    ContractsComponent,
    ProfileComponent,
    SettingComponent,
    VerifyTokenComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ArtistRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArtistModule { }
