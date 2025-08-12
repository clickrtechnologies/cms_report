import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
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
