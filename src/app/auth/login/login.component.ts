import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.errorMessage = '';
        // success redirect logic handled inside auth service
      },
      error: (err) => {
        this.errorMessage = err?.error?.errorMessage || 'Login failed';
      }
    });
  }
}
