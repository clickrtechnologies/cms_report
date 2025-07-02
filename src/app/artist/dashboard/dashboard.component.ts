import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  songs = [
    {
      artistName: 'Neha Kakkar',
      albumName: 'Hits 2025',
      songName: 'Lehenga',
      songCode: 'ALX-001',
      genre: 'Pop',
      uploadDate: '2025-07-01',
      cpName: 'Alex Content Co.',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      licensedCountry: 'India',
      licensedMno: 'Airtel',
      approved: true
    },
    {
      artistName: 'KK',
      albumName: 'Soul Beats',
      songName: 'Pal',
      songCode: 'ALX-002',
      genre: 'Soft Rock',
      uploadDate: '2025-06-28',
      cpName: 'Alex Content Co.',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      licensedCountry: 'India',
      licensedMno: 'Vodafone',
      approved: true
    }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#artistDashboard').DataTable({
      paging: true,
      searching: true,
      ordering: true,
      scrollX: true,
      pageLength: 10 
      });
    }, 100);
  }
}
