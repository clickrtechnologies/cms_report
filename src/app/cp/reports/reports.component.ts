import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeoInfo } from 'src/app/models/cp-models/geo-info.model';
import { Reports } from 'src/app/models/cp-models/report.model';
import { ReportService } from 'src/app/service/cp-service/reports.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  selectedGeo: string | null = null;
  selectedMonth: string | null = null;


  reportsData: Reports[] = [];
  geoList: GeoInfo[] = [];

  constructor(private reportService: ReportService) {
      this.getReportList();
      this.getGeoList();

    }

  getReportList(): void {
  this.reportService.getReports().subscribe({
    next: (response: any) => {
      this.reportsData = Array.isArray(response.data) ? response.data : [];
    },
    error: (err) => {
      console.error('Failed to fetch Report list:', err);
      this.reportsData = [];
    }
  });
}

  getGeoList(): void {
    this.reportService.getGeoList().subscribe({
      next: (response: any) => {
        this.geoList = Array.isArray(response.data) ? response.data : [];
      },
      error: (err) => {
        console.error('Failed to fetch Geo list:', err);
        this.geoList = [];
      }
    });
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
      if (typeof $ !== 'undefined' && $('#admin-cp-report').length) {
        $('#admin-cp-report').DataTable({
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
