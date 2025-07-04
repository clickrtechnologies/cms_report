import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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
      $('#artistTable').DataTable({ 
       dom: 'Bfrtip',
        paging: true,
        searching: true,
        ordering: true,
        scrollX: true,
        pageLength: 10,
        buttons: ['excelHtml5', 'csvHtml5', 'copy', 'print']
      
      });

    }, 100);
  }
}
