import { Injectable } from '@angular/core';
import { MnoSong } from 'src/app/models/mno-models/mno-song.model';

@Injectable({
  providedIn: 'root'
})
export class MnoDashboardService {
  constructor() {}

  getMnoSongs(): MnoSong[] {
    return [
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
  }
}
