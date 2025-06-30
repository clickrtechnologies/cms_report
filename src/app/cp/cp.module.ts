import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRoutingModule } from './cp-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ContentUploadComponent,
    NameRbtComponent,
    ReportsComponent,
    ContractsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CpRoutingModule
  ]
})
export class CpModule {}

