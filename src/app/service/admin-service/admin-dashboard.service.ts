import { Injectable } from '@angular/core';
import { AdminReportRow } from 'src/app/models/admin-models/admin-report-row.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  constructor() {}

  getAdminReports(): AdminReportRow[] {
    return [
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
        contractPdf: 'assets/contracts/contract1.pdf',
        contractExpiry: '2025-12-31',
        audioFile: 'assets/audio/audio1.mp3',
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
        contractPdf: 'assets/contracts/contract2.pdf',
        contractExpiry: '2026-01-15',
        audioFile: 'assets/audio/audio2.mp3',
        approvalArtist: false,
        approvalMno: true
      }
    ];
  }
}
