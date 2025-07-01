import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MnoLayoutComponent } from '../layout/mno-layout/mno-layout.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [
  {
    path: '',
    component : MnoLayoutComponent,
    children: [

      {path : "mno", redirectTo: 'dashboard', pathMatch: 'full'},
      {path : "dashboard", component : DashboardComponent},
      {path : "reports" , component : ReportsComponent},
      {path : "approvals", component : ApprovalsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MnoRoutingModule { }
