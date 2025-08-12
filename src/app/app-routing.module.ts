import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public login routes
  { path: 'admin/login', component: LoginComponent },
  { path: 'artist/login', component: LoginComponent },
  { path: 'cp/login', component: LoginComponent },
  { path: 'mno/login', component: LoginComponent },

  // Protected lazy-loaded modules
  {
    path: 'cp',
    loadChildren: () => import('./cp/cp.module').then(m => m.CpModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'artist',
    loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mno',
    loadChildren: () => import('./mno/mno.module').then(m => m.MnoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
