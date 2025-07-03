import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.css']
})
export class ArtistManagementComponent {
  artistLogins = [
    { cpName: 'CP1 Music', name: 'Arijit Singh', email: 'arijit@example.com', username: 'arijit', password: '123456' }
  ];


  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#artistTable').DataTable({ pageLength: 5, scrollX: true });

    }, 100);
  }
}
