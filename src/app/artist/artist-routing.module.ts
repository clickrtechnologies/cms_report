import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistLayoutComponent } from '../layout/artist-layout/artist-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ReportsComponent } from './reports/reports.component';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistLayoutComponent,
    children : [
      {path : 'artist', redirectTo: 'dashboard', pathMatch: 'full'},
      {path : 'dashboard', component:DashboardComponent},
      {path : 'approvals', component : ApprovalsComponent},
      {path : 'reports', component : ReportsComponent},
      {path : 'contracts', component : ContractsComponent}
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
