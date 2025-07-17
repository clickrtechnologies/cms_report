import { Injectable } from '@angular/core';
import { Rbt } from '../../models/cp-models/rbt.model';

@Injectable({
  providedIn: 'root'
})
export class RbtService {

  constructor() {}

  getRbtList(): Rbt[] {
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
        msisdn: '9123456780',
        name: 'Caller Tune 2',
        audioFile: null,
        audioUrl: 'https://example.com/audio/sample2.mp3',
        hasPreviewed: true,
        code: 'RBT5678'
      }
    ];
  }
}
