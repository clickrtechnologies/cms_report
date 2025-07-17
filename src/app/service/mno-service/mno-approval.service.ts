import { Injectable } from '@angular/core';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';

@Injectable({
  providedIn: 'root'
})
export class MnoApprovalService {
  constructor() {}

  getApprovals(): MnoApproval[] {
    return [
      {
        artistName: 'Arijit Singh',
        albumName: 'Romantic Vibes',
        songName: 'Tum Hi Ho',
        songCode: 'ALX-0001',
        qrCodeUrl: 'https://example.com/qr/ALX-0001',
        genre: 'Romantic',
        cpName: 'CP1 Music Co.',
        country: 'India',
        mno: 'Airtel',
        contractFile: new File(['dummy content'], 'contract.pdf', { type: 'application/pdf' }),
        expiryDate: '2026-01-31',
        audioUrl: 'https://example.com/audio/tum-hi-ho.mp3',
        approved: true,
        rejectionReason: ''
      }
    ];
  }
}
