import { AfterViewInit, Component } from '@angular/core';
import { AdminReportRow } from 'src/app/models/admin-models/admin-report-row.model';
import { AdminDashboardService } from 'src/app/service/admin-service/admin-dashboard.service';
declare var $: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  // rows: AdminReportRow[] = [];
  dashboardData: any;

  constructor(private adminDashboardService: AdminDashboardService) {
    // this.rows = this.adminDashboardService.getAdminReports();
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     $('#adminDashboard').DataTable({
  //       dom: 'Bfrtip',
  //       paging: true,
  //       searching: true,
  //       ordering: true,
  //       scrollX: true,
  //       pageLength: 10,
  //       buttons: ['excelHtml5', 'csvHtml5', 'copy', 'print']
  //     });
  //   }, 0);
  // }
  ngOnInit(): void {
    this.getAdminDashboard();
  }


 getAdminDashboard(): void {
      this.adminDashboardService.getAdminDashboard().subscribe({
        next: (response: any) => {
          this.dashboardData = Array.isArray(response.data) ? response.data : [];
          console.log('Dashboard Data:', this.dashboardData);
        },
        error: (err: any) => {
          console.error('Failed to fetch artist logins:', err);
          this.dashboardData = [];
        }
      });
    }
}
