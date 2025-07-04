import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  login() {
    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
