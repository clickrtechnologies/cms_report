import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  selectedGeo: string | null = null;
  selectedMonth: string | null = null;

  geoList = [
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

  reportsData = [
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

  selectGeo(geo: string) {
    this.selectedGeo = this.selectedGeo === geo ? null : geo;
    this.selectedMonth = null;
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
  }
}
