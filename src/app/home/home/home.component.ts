import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user: User | null = this.AuthService.getLoggedInUser();

    if (user) {
      switch (user.role) {
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
        default:
          this.router.navigate(['/login']);
      }
    }
  }
}
