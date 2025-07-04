import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'admin/login', component: LoginComponent },
  { path: 'artist/login', component: LoginComponent },
  { path: 'cp/login', component: LoginComponent },
  { path: 'mno/login', component: LoginComponent },
  {
    path: 'cp',
    loadChildren: () => import('./cp/cp.module').then(m => m.CpModule)
  },
  {
    path : 'artist',
    loadChildren: () =>import('./artist/artist.module').then(m=>m.ArtistModule)
  },
  {
    path : 'mno',
    loadChildren: () =>import('./mno/mno.module').then(m=>m.MnoModule)
  },
  {
    path : 'admin',
    loadChildren: () =>import('./admin/admin.module').then(m=>m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
