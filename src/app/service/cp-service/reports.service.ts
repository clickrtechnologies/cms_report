import { Injectable } from '@angular/core';
import { GeoInfo } from 'src/app/models/cp-models/geo-info.model';
import { Reports } from 'src/app/models/cp-models/report.model';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() {}

  getGeoList(): GeoInfo[] {
    return [
      {
        geo: 'India',
        mno: 'Airtel',
        months: ['June-2025', 'May-2025', 'April-2025']
      },
      {
        geo: 'UAE',
        mno: 'Etisalat',
        months: ['June-2025', 'May-2025']
      }
    ];
  }

  getReports(): Reports[] {
    return [
      {
        date: '2025-06-01',
        artist: 'Arijit Singh',
        album: 'Romantic Hits',
        song: 'Tum Hi Ho',
        genre: 'Romantic',
        downloads: 4321,
        modes: { copy: 1800, ivr: 1500, app: 1021 },
        rbtSet: 325,
        cp: 'CP1 Music Co.'
      },
      {
        date: '2025-06-02',
        artist: 'Shreya Ghoshal',
        album: 'Melody Queen',
        song: 'Sun Raha Hai',
        genre: 'Melody',
        downloads: 2650,
        modes: { copy: 1000, ivr: 900, app: 750 },
        rbtSet: 210,
        cp: 'CP1 Music Co.'
      }
    ];
  }
}
