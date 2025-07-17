import { Component, OnInit } from '@angular/core';
import { MnoReportService } from 'src/app/service/mno-service/mno-report.service';

interface ReportData {
  sno: number;
  date: string;
  artistName: string;
  albumName: string;
  songName: string;
  genCat: string;
  downloads: number;
  modes: {
    copy: boolean;
    ivr: boolean;
    app: boolean;
  };
  cpName: string;
}

interface GeoMno {
  name: string;
  months: string[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportData: ReportData[] = [];
  selectedFile: File | null = null;
  currentMonth = new Date().toLocaleString('default', { month: 'long' });
  currentYear = new Date().getFullYear();

  geoMnoList: GeoMno[] = [ ];
  selectedGeo: GeoMno | null = null;
  selectedMonth: string | null = null;

  constructor(private mnoReportService: MnoReportService) {}

  ngOnInit(): void {
    // Initialize with sample data or fetch from service
    this.reportData = [];
    this.loadReportData();
     this.loadGeoMnoList();
  }

  loadReportData(): void {
    this.reportData = this.mnoReportService.getReportData();
  }

  loadGeoMnoList(): void {
    this.geoMnoList = this.mnoReportService.getGeoMnoList();
  }

  toggleGeo(geo: GeoMno): void {
    if (this.selectedGeo === geo) {
      this.selectedGeo = null;
      this.selectedMonth = null;
    } else {
      this.selectedGeo = geo;
      this.selectedMonth = null;
    }
  }

  selectMonth(geo: GeoMno, month: string): void {
    this.selectedGeo = geo;
    this.selectedMonth = month;
    // Optionally, load report data for this selection
    // this.loadReportData(geo, month);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Here you would typically process the file
      this.processFile();
    }
  }

  processFile(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      // Here you would implement the actual file processing logic
      // For CSV files, you might parse the content and update reportData
      console.log('File processed:', this.selectedFile?.name);
    };
    reader.readAsText(this.selectedFile);
  }

  exportToExcel(): void {
    // Implement export functionality
    console.log('Exporting to Excel...');
  }

  generateReport(): void {
    // Implement report generation
    console.log('Generating report...');
  }
}
