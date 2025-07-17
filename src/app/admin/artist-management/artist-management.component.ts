import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistLogin } from 'src/app/models/admin-models/artist-login.model';
import { ArtistManagementService } from 'src/app/service/admin-service/artist-management.service';

declare var $: any;

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.css']
})
export class ArtistManagementComponent {

  artistLogins : ArtistLogin[]= [ ];

  constructor(private artistManagementService: ArtistManagementService) {
    this.artistLogins = this.artistManagementService.getArtistLogins();
  }


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
