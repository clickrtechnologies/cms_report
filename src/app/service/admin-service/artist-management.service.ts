import { Injectable } from '@angular/core';
import { ArtistLogin } from 'src/app/models/admin-models/artist-login.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistManagementService {
  constructor() {}

  getArtistLogins(): ArtistLogin[] {
    return [
      {
        cpName: 'CP1 Music',
        name: 'Arijit Singh',
        email: 'arijit@example.com',
        username: 'arijit',
        password: '123456'
      },
      {
        cpName: 'CP2 Beats',
        name: 'Neha Kakkar',
        email: 'neha@example.com',
        username: 'neha',
        password: 'abcdef'
      }
    ];
  }
}
