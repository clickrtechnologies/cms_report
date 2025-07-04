import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistManagementComponent } from './artist-management/artist-management.component';
import { CpManagementComponent } from './cp-management/cp-management.component';
import { MnoManagementComponent } from './mno-management/mno-management.component';
import { UserComponent } from './user/user.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component : AdminLayoutComponent,
    children: [
      {path : '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path : 'dashboard', component : DashboardComponent},
      {path : 'artist-management', component : ArtistManagementComponent},
      {path : 'cp-management', component : CpManagementComponent},
      {path : 'mno-management', component : MnoManagementComponent},
      {path : 'user-management', component : UserComponent},
      {path : 'name-rbt', component : NameRbtComponent},
      {path : 'setting', component : SettingComponent},
      {path : 'profile', component : ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
