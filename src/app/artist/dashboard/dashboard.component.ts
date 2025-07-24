import { Component, AfterViewInit } from '@angular/core';
import { ArtistSong } from 'src/app/models/artist-models/artist-song.model';
import { ArtistDashboardService } from 'src/app/service/artist-service/artist-dashboard.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // songs = [
  //   {
  //     artistName: 'Neha Kakkar',
  //     albumName: 'Hits 2025',
  //     songName: 'Lehenga',
  //     songCode: 'ALX-001',
  //     genre: 'Pop',
  //     uploadDate: '2025-07-01',
  //     cpName: 'Alex Content Co.',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     licensedCountry: 'India',
  //     licensedMno: 'Airtel',
  //     approved: true
  //   },
  //   {
  //     artistName: 'KK',
  //     albumName: 'Soul Beats',
  //     songName: 'Pal',
  //     songCode: 'ALX-002',
  //     genre: 'Soft Rock',
  //     uploadDate: '2025-06-28',
  //     cpName: 'Alex Content Co.',
  //     fromDate: '2025-07-01',
  //     toDate: '2025-12-31',
  //     licensedCountry: 'India',
  //     licensedMno: 'Vodafone',
  //     approved: true
  //   }
  // ];

  

  songs: ArtistSong[] = [];
    
      constructor(private artistDashboardService: ArtistDashboardService) {
        this.getSongList();
      }

  // Fetch songs from the service
  getSongList(): void {
    this.artistDashboardService.getArtistDashboardSongs().subscribe({
      next: (response: any) => {
        this.songs = Array.isArray(response.data) ? response.data : [];
      },
      error: (err) => {
        console.error('Failed to fetch songs:', err);
        this.songs = [];
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#artistDashboard').DataTable({
          dom: 'Bfrtip',
          paging: true,
          searching: true,
          ordering: true,
          scrollX: true,
          pageLength: 10, 
          buttons: ['excelHtml5', 'csvHtml5','copy', 'print'] 
      });
    }, 100);
  }
}
