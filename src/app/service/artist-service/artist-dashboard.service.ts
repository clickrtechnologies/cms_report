import { Injectable } from '@angular/core';
import { ArtistSong } from 'src/app/models/artist-models/artist-song.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistDashboardService {

  constructor() {}

  getArtistDashboardSongs(): ArtistSong[] {
    return [
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
  }
}
