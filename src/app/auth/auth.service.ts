import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { email: 'admin@gmail.com', password: 'admin@123', role: 'admin' },
    { email: 'cp@gmail.com', password: 'cp@123', role: 'cp' },
    { email: 'artist@gmail.com', password: 'artist@123', role: 'artist' },
    { email: 'mno@gmail.com', password: 'mno@123', role: 'mno' },
  ];

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.navigateToDashboard(user.role);
      return true;
    }
    return false;
  }

  private navigateToDashboard(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'cp':
        this.router.navigate(['/cp/dashboard']);
        break;
      case 'artist':
        this.router.navigate(['/artist/dashboard']);
        break;
      case 'mno':
        this.router.navigate(['/mno/dashboard']);
        break;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
}
