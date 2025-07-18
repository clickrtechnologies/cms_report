import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpLayoutComponent } from '.././layout/cp-layout/cp-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CpLayoutComponent,
    children: [
      { path: '',redirectTo: 'dashboard', pathMatch: 'full'  },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'content-upload', component: ContentUploadComponent },
      { path: 'name-rbt', component: NameRbtComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'contracts', component: ContractsComponent },
      {path : 'setting', component : SettingComponent},
      {path : 'profile', component : ProfileComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent, 
    children: [
      { path: 'cp-reports', component: ReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpRoutingModule {}
