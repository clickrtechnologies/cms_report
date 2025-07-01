import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cp',
    loadChildren: () => import('./cp/cp.module').then(m => m.CpModule)
  },
  {
    path: '',
    redirectTo: '/cp/dashboard',
    pathMatch: 'full'
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
