import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CpLogin } from 'src/app/models/admin-models/cp-login.model';
import { CpManagementService } from 'src/app/service/admin-service/cp-management.service';

declare var $: any;

@Component({
  selector: 'app-cp-management',
  templateUrl: './cp-management.component.html',
  styleUrls: ['./cp-management.component.css']
})
export class CpManagementComponent {

  cpLogins: CpLogin[] = [];

  constructor(private cpManagementService: CpManagementService) {
    this.cpLogins = this.cpManagementService.getCpLogins();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#cpTable').DataTable({
       dom: 'Bfrtip',
        paging: true,
        searching: true,
        ordering: true,
        scrollX: true,
        pageLength: 10,
        buttons: ['excelHtml5', 'csvHtml5', 'copy', 'print']

      });
    }, 100);
  }
}
