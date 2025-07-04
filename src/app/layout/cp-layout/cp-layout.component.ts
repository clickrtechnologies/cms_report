import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-layout',
  templateUrl: './cp-layout.component.html',
  styleUrls: ['./cp-layout.component.css']
})
export class CpLayoutComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/home']);
    }
  }
}
