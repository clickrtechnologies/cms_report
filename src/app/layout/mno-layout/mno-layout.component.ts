import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mno-layout',
  templateUrl: './mno-layout.component.html',
  styleUrls: ['./mno-layout.component.css']
})
export class MnoLayoutComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (!sessionStorage.getItem('userRole')) {
      this.router.navigate(['/home']);
    }
  }
}
