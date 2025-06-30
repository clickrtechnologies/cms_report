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
    path: '**',
    redirectTo: '/cp/dashboard'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
