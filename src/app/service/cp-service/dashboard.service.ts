// src/app/dashboard/dashboard.component.ts

import { Component, AfterViewInit, Injectable } from '@angular/core';
import { Song } from 'src/app/models/cp-models/song.model';


@Injectable({
  providedIn: 'root'
})

export class DashboardService  {

  constructor() {}

  getSongs(): Song[] {
    return [
      {
        artistName: 'Hony Singh',
        albumName: 'Trending Vibes',
        songName: 'yo yo honey singh',
        songCode: 'RBT12346',
        qrCodeUrl: 'https://example.com/wap/RBT12346',
        category: 'Romantic',
        uploadDate: '2025-06-29',
        cpName: 'CP1 Music Co.',
        fromDate: '2025-07-01',
        toDate: '2025-12-31',
        country: 'India',
        mnoName: 'Airtel',
        contractAvailable: true,
        audioUrl: 'https://example.com/audio/yo-yohoneysingh.mp3'
      },
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
      }
    ];
  }
}
