import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MnoLogin } from 'src/app/models/admin-models/mno-login.model';
import { MnoManagementService } from 'src/app/service/admin-service/mno-management.service';

declare var $: any;

@Component({
  selector: 'app-mno-management',
  templateUrl: './mno-management.component.html',
  styleUrls: ['./mno-management.component.css']
})
export class MnoManagementComponent {
  mnoLogins :MnoLogin[]= [];

  constructor(private mnoManagementService: MnoManagementService) {
    this.mnoLogins = this.mnoManagementService.getMnoLogins();
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#mnoTable').DataTable({
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
