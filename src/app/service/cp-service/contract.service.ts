// src/app/contract.service.ts
import { Injectable } from '@angular/core';
import { Contract } from '../../models/cp-models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() {}

  getContracts(): Contract[] {
    return [
      {
        artistName: 'Arijit Singh',
        albumName: 'Romantic Vibes',
        songName: 'Tum Hi Ho',
        genre: 'Romantic',
        cpName: 'CP1 Music Co.',
        licensedCountry: 'India',
        licensedMNO: 'Airtel',
        fromDate: '2025-07-01',
        toDate: '2025-12-31',
        expiryDate: '2026-01-31',
        contractFile: null
      }
    ];
  }
}
