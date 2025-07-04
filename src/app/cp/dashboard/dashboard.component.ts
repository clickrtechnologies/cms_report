import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  songs = [
    {
      artistName: 'Arijit Singh',
      albumName: 'Soulful Vibes',
      songName: 'Tum Hi Ho',
      songCode: 'RBT12345',
      qrCodeUrl: 'https://example.com/wap/RBT12345',
      category: 'Romantic',
      uploadDate: '2025-06-30',
      cpName: 'CP1 Music Co.',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      country: 'India',
      mnoName: 'Airtel',
      contractAvailable: true,
      audioUrl: 'https://example.com/audio/tumhiho.mp3'
    },
        {
      artistName: 'Hony Singh',
      albumName: 'Trending Vibes',
      songName: 'yo yo honey singh',
      songCode: 'RBT12346',
      qrCodeUrl: 'https://example.com/wap/RBT12345',
      category: 'Romantic',
      uploadDate: '2025-06-29',
      cpName: 'CP1 Music Co.',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      country: 'India',
      mnoName: 'Airtel',
      contractAvailable: true,
      audioUrl: 'https://example.com/audio/tumhiho.mp3'
    }

  ];

  ngAfterViewInit(): void {
    // Wait for the DOM and jQuery to load
    const waitForjQuery = setInterval(() => {
      if (typeof $ !== 'undefined' && $('#cpTable').length) {
        $('#cpTable').DataTable({
          dom: 'Bfrtip',
          paging: true,
          searching: true,
          ordering: true,
          scrollX: true,
          pageLength: 10, 
          buttons: ['excelHtml5', 'csvHtml5','copy', 'print'] 
          //buttons: ['excelHtml5', 'csvHtml5','copy', 'csv', 'excel', 'print']
        });
        clearInterval(waitForjQuery);
      }
    }, 0);
  }

}
