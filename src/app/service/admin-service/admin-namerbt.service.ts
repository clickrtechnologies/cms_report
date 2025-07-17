import { Injectable } from '@angular/core';
import { NameRbt } from 'src/app/models/admin-models/admin-name-rbt.model';

@Injectable({
  providedIn: 'root'
})
export class NameRbtService {
  constructor() {}

  getNameRbtList(): NameRbt[] {
    return [
      {
        msisdn: '9876543210',
        name: 'Welcome Tune',
        audioFile: null,
        audioUrl: '',
        hasPreviewed: false,
        code: 'RBT1234'
      },
      {
        msisdn: '9876501234',
        name: 'Good Morning Tune',
        audioFile: null,
        audioUrl: '',
        hasPreviewed: false,
        code: 'RBT5678'
      }
    ];
  }
}
