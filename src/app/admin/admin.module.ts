import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArtistManagementComponent } from './artist-management/artist-management.component';
import { CpManagementComponent } from './cp-management/cp-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MnoManagementComponent } from './mno-management/mno-management.component';
import { UserComponent } from './user/user.component';
import { NameRbtComponent } from './name-rbt/name-rbt.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArtistManagementComponent,
    CpManagementComponent,
    DashboardComponent,
    MnoManagementComponent,
    UserComponent,
    NameRbtComponent,
    SettingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
