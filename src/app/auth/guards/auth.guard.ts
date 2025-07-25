import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  private isLoggedIn(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }

  canActivate(): boolean | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    }
    // Redirect to home if not logged in
    return this.router.parseUrl('/home');
  }

  canLoad(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    // Redirect won't work here, so just return false to prevent loading
    this.router.navigate(['/home']);
    return false;
  }
}
