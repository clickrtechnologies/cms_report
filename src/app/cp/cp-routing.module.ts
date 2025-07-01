import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpLayoutComponent } from '.././layout/cp-layout/cp-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [
  {
    path: '',
    component: CpLayoutComponent,
    children: [
      { path: 'cp', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'content-upload', component: ContentUploadComponent },
      { path: 'name-rbt', component: NameRbtComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'contracts', component: ContractsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpRoutingModule {}
