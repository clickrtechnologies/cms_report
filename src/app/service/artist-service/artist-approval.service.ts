// src/app/contract.service.ts
import { Injectable } from '@angular/core';
import { ArtistApproval } from 'src/app/models/artist-models/artist-approval.model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor() {}

  getApprovals(): ArtistApproval[] {
    return [
      {
      id: 1,
      artist: 'Arijit Singh',
      album: 'Soulful Tunes',
      songName: 'Raabta',
      songFile: 'assets/audio/raabta.mp3',
      genre: 'Romantic',
      uploadDate: '2025-07-01',
      cp: 'Alex Music',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      country: 'India',
      mno: 'Airtel',
      approved: null,
      songCode: '',
      qrUrl: ''
    }
    ];
  }
}
