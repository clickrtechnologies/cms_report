import { AfterViewInit , Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  mnoSongs = [
    {
      artistName: 'Arijit Singh',
      albumName: 'Romantic Vibes',
      songName: 'Tum Hi Ho',
      songCode: 'ALX-0001',
      qrCodeUrl: 'https://example.com/subscribe/song/ALX-0001',
      category: 'Romantic',
      uploadDate: '2025-07-01',
      cpName: 'CP1 Music Co.',
      country: 'India',
      mnoName: 'Airtel',
      contractAvailable: true,
      audioUrl: 'https://example.com/audio/tum-hi-ho.mp3'
    }
  ];

    ngAfterViewInit(): void {
    setTimeout(() => {
      $('#mnoTable').DataTable({
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


