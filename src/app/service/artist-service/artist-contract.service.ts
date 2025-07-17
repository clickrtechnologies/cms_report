// src/app/contract.service.ts
import { Injectable } from '@angular/core';
import { ArtistContract } from 'src/app/models/artist-models/artist-contract.model';
import { Contract } from 'src/app/models/cp-models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistContractService {

  constructor() {}

  getContracts(): ArtistContract[] {
    return [
      {
        date: '2025-07-01',
        artistName: 'Arijit Singh',
        albumName: 'Soulful Melodies',
        songName: 'Tum Mile',
        genre: 'Romantic',
        cpName: 'Melody Records',
        fromDate: '2025-07-01',
        toDate: '2025-12-31',
        contractFile: null
      },
      {
        date: '2025-07-10',
        artistName: 'Neha Kakkar',
        albumName: 'Party Hits',
        songName: 'Coca Cola',
        genre: 'Dance',
        cpName: 'BeatBox Studios',
        fromDate: '2025-07-15',
        toDate: '2025-11-30',
        contractFile: null
      }
    ];
  }
}
