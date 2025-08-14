import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  id: string;
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
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
  `${environment.apiUrl}auth/login`,
  { email, password }
).pipe(
  tap((response) => {
    sessionStorage.setItem(this.tokenKey, response.accessToken);
    sessionStorage.setItem(this.roleKey, response.role);
    sessionStorage.setItem('id', response.id)
    this.navigateToDashboard(response.role);
  })
);

  }

  // 🔁 Navigate to dashboard
  private navigateToDashboard(role: string) {
  console.log('Navigating based on role:', role);  // Add this

  switch (role) {
    case 'ROLE_ADMIN':
      this.router.navigate(['/admin/dashboard']).then(success => console.log('Admin nav success?', success));
      break;
    case 'ROLE_CP':
      this.router.navigate(['/cp/dashboard']).then(success => console.log('CP nav success?', success));
      break;
    case 'ROLE_ARTIST':
      this.router.navigate(['/artist/dashboard']).then(success => console.log('Artist nav success?', success));
      break;
    case 'ROLE_MNO':
      this.router.navigate(['/mno/dashboard']).then(success => console.log('MNO nav success?', success));
      break;
    case 'ROLE_SUPER_ADMIN':
      this.router.navigate(['/admin/dashboard']).then(success => console.log('Super Admin nav success?', success));
      break;
    default:
      console.warn('Unknown role. Redirecting to login.');
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
