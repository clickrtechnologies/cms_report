import { Injectable } from '@angular/core';
import { GeoMno } from 'src/app/models/mno-models/mno-geo.model';
import { ReportData } from 'src/app/models/mno-models/mno-report.model';

@Injectable({
  providedIn: 'root'
})
export class MnoReportService {
  constructor() {}

  getReportData(): ReportData[] {
    return [
      {
        sno: 1,
        date: '2025-07-01',
        artistName: 'Arijit Singh',
        albumName: 'Romantic Vibes',
        songName: 'Tum Hi Ho',
        genCat: 'Romantic',
        downloads: 15000,
        modes: {
          copy: true,
          ivr: false,
          app: true
        },
        cpName: 'CP1 Music'
      }
    ];
  }

  getGeoMnoList(): GeoMno[] {
    return [
      {
        name: 'Airtel',
        months: ['January', 'February', 'March']
      },
      {
        name: 'Jio',
        months: ['April', 'May', 'June']
      }
    ];
  }
}
