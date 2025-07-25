import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  accessToken: string;
  role: string;
  username: string;
  tokenType?: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'accessToken';
  private roleKey = 'userRole';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Authenticate user
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
  `${environment.apiUrl}auth/login`,
  { username, password }
).pipe(
  tap((response) => {
    sessionStorage.setItem(this.tokenKey, response.accessToken);
    sessionStorage.setItem(this.roleKey, response.role);
    this.navigateToDashboard(response.role);
  })
);

  }

  // 🔁 Navigate to dashboard
  private navigateToDashboard(role: string) {
    switch (role) {
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'ROLE_CP':
        this.router.navigate(['/cp/dashboard']);
        break;
      case 'ROLE_ARTIST':
        this.router.navigate(['/artist/dashboard']);
        break;
      case 'ROLE_MNO':
        this.router.navigate(['/mno/dashboard']);
        break;
      case 'ROLE_SUPER_ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  //  Logout
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
  }

  //  Helpers
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getLoggedInUser(): User | null {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
}
