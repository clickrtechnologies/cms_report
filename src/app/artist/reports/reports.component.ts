import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistReport } from 'src/app/models/artist-models/artist-report.model';
import { GeoInfo } from 'src/app/models/cp-models/geo-info.model';
import { ArtistReportService } from 'src/app/service/artist-service/artist-report.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  selectedGeo: string | null = null;
  selectedMonth: string | null = null;

  // geoList = [
  //   {
  //     geo: 'India',
  //     mno: 'Airtel',
  //     months: ['June-2025', 'May-2025', 'April-2025']
  //   },
  //   {
  //     geo: 'UAE',
  //     mno: 'Etisalat',
  //     months: ['June-2025', 'May-2025']
  //   }
  // ];

  // reportsData = [
  //   {
  //     date: '2025-06-01',
  //     artist: 'Arijit Singh',
  //     album: 'Romantic Hits',
  //     song: 'Tum Hi Ho',
  //     genre: 'Romantic',
  //     downloads: 4321,
  //     modes: { copy: 1800, ivr: 1500, app: 1021 },
  //     cp: 'CP1 Music Co.'
  //   },
  //   {
  //     date: '2025-06-02',
  //     artist: 'Shreya Ghoshal',
  //     album: 'Melody Queen',
  //     song: 'Sun Raha Hai',
  //     genre: 'Melody',
  //     downloads: 2650,
  //     modes: { copy: 1000, ivr: 900, app: 750 },
  //     cp: 'CP1 Music Co.'
  //   }
  // ];

   
  
  
    reportsData: ArtistReport[] = [];
    geoList: GeoInfo[] = [];
  
    constructor(private artistReportService: ArtistReportService) {
        this.reportsData = this.artistReportService.getArtistReports();
        this.geoList = this.artistReportService.getGeoList();
  
      }

  selectGeo(geo: string) {
    this.selectedGeo = this.selectedGeo === geo ? null : geo;
    this.selectedMonth = null;
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
  }

  ngAfterViewInit(): void {
    // Wait for the DOM and jQuery to load
    const waitForjQuery = setInterval(() => {
      if (typeof $ !== 'undefined' && $('#admin-artist-report').length) {
        $('#admin-artist-report').DataTable({
          dom: 'Bfrtip',
          paging: true,
          searching: true,
          ordering: true,
          scrollX: true,
          pageLength: 10, 
          buttons: ['excelHtml5', 'csvHtml5','copy', 'print'] 
        });
        clearInterval(waitForjQuery);
      }
    },0);
  }
}
