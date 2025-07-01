import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistManagementComponent } from './artist-management/artist-management.component';
import { CpManagementComponent } from './cp-management/cp-management.component';
import { MnoManagementComponent } from './mno-management/mno-management.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component : AdminLayoutComponent,
    children: [
      {path: 'admin', redirectTo: 'dashboard', pathMatch: 'full'},
      {path : 'dashboard', component : DashboardComponent},
      {path : 'artist-management', component : ArtistManagementComponent},
      {path : 'cp-management', component : CpManagementComponent},
      {path : 'mno-management', component : MnoManagementComponent},
      {path : 'name-rbt', component : NameRbtComponent},
      {path : 'reports', component : ReportsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
