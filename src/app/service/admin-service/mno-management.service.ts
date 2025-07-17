import { Injectable } from '@angular/core';
import { MnoLogin } from 'src/app/models/admin-models/mno-login.model';

@Injectable({
  providedIn: 'root'
})
export class MnoManagementService {
  constructor() {}

  getMnoLogins(): MnoLogin[] {
    return [
      {
        telco: 'Airtel',
        name: 'MNO Head',
        email: 'mno@example.com',
        username: 'mnohead',
        password: '123456'
      },
      {
        telco: 'Jio',
        name: 'Jio Admin',
        email: 'jio@example.com',
        username: 'jioadmin',
        password: 'abcdef'
      }
    ];
  }
}
