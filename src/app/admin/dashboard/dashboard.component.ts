import { AfterViewInit, Component } from '@angular/core';

declare var $: any;

interface AdminReportRow {
  sno: number;
  artistName: string;
  albumName: string;
  songName: string;
  songCode: string;
  qrCode: string;
  genre: string;
  cpName: string;
  licensedCountry: string;
  licensedMno: string;
  contractPdf: string;
  contractExpiry: string;
  audioFile: string;
  approvalArtist: boolean;
  approvalMno: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  rows: AdminReportRow[] = [
    {
      sno: 1,
      artistName: 'Artist 1',
      albumName: 'Album A',
      songName: 'Song X',
      songCode: 'SC001',
      qrCode: 'QR001',
      genre: 'Pop',
      cpName: 'CP Alpha',
      licensedCountry: 'Country 1',
      licensedMno: 'MNO 1',
      contractPdf: 'contract1.pdf',
      contractExpiry: '2025-12-31',
      audioFile: 'audio1.mp3',
      approvalArtist: true,
      approvalMno: false
    },
    {
      sno: 2,
      artistName: 'Artist 2',
      albumName: 'Album B',
      songName: 'Song Y',
      songCode: 'SC002',
      qrCode: 'QR002',
      genre: 'Rock',
      cpName: 'CP Beta',
      licensedCountry: 'Country 2',
      licensedMno: 'MNO 2',
      contractPdf: 'contract2.pdf',
      contractExpiry: '2026-01-15',
      audioFile: 'audio2.mp3',
      approvalArtist: false,
      approvalMno: true
    }
  ];
  ngAfterViewInit(): void {
    // Wait for the DOM and jQuery to load
    const waitForjQuery = setInterval(() => {
      if (typeof $ !== 'undefined' && $('#adminTable').length) {
        $('#cpTable').DataTable({
          dom: 'Bfrtip',
          paging: true,
          searching: true,
          ordering: true,
          scrollX: true,
          pageLength: 10, 
          buttons: ['excelHtml5', 'csvHtml5','copy', 'print'] 
        });
        clearInterval(waitForjQuery);
      }
    }, 0);
  }

}
