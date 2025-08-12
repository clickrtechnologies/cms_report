import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (!sessionStorage.getItem('userRole')) {
      console.log('User not logged in, redirecting to home');
      this.router.navigate(['/home']);
    }
  }
}
