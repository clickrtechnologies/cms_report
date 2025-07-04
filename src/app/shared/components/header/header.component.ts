import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: User | null = null;
  isLoggedIn = false;
  userImage = 'https://ui-avatars.com/api/?background=random&name=User';
  notifications: string[] = [];
  showNotifications = false;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.AuthService.getLoggedInUser();
    this.isLoggedIn = this.AuthService.isLoggedIn();

    if (this.user) {
      this.userImage = `https://ui-avatars.com/api/?background=random&name=${this.user.role}`;
      this.notifications = [
        'You have 2 new requests',
        'System update available',
        'Reminder: Meeting at 3 PM'
      ];
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }
}
