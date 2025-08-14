import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRoutingModule } from './cp-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ContentUploadComponent,
    NameRbtComponent,
    ReportsComponent,
    ContractsComponent,
    ProfileComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CpRoutingModule,
    ReactiveFormsModule
  ]
})
export class CpModule {}

