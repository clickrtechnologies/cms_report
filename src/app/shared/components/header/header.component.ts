import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  role: string = '';
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    // Example expected structure: { name: "John", role: "cp" }
    this.role = userData.role || '';
    this.username = userData.name || 'User';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
