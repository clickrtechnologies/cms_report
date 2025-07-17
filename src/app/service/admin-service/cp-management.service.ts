import { Injectable } from '@angular/core';
import { CpLogin } from 'src/app/models/admin-models/cp-login.model';

@Injectable({
  providedIn: 'root'
})
export class CpManagementService{
  constructor() {}

  getCpLogins(): CpLogin[] {
    return [
      {
        name: 'CP1 Music',
        email: 'cp1@example.com',
        username: 'cp1user',
        password: '123456'
      },
      {
        name: 'CP2 Beats',
        email: 'cp2@example.com',
        username: 'cp2user',
        password: 'abcdef'
      }
    ];
  }
}
