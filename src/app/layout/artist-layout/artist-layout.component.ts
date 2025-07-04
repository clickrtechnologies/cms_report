import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-layout',
  templateUrl: './artist-layout.component.html',
  styleUrls: ['./artist-layout.component.css']
})
export class ArtistLayoutComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/home']);
    }
  }
}
