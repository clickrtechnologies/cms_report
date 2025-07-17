// src/app/cp-task.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentUploadService {

  constructor() {}

  getUploads() {
    return [
      {
        id: 1,
        artistName: 'Arijit Singh',
        albumName: 'Love Hits',
        songName: 'Tum Hi Hoo',
        genre: 'Romantic',
        uploadDate: '2025-07-15',
        cpName: 'Sony Music',
        country: 'India',
        mno: '9876543210',
        audioFile: null as File | null
      },
      {
        id: 2,
        artistName: 'Shreya Ghoshal',
        albumName: 'Melodies',
        songName: 'Teri Ore',
        genre: 'Soft',
        uploadDate: '2025-07-16',
        cpName: 'T-Series',
        country: 'India',
        mno: '9123456789',
        audioFile: null as File | null
      }
    ];
  }
}
