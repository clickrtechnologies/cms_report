import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cp-management',
  templateUrl: './cp-management.component.html',
  styleUrls: ['./cp-management.component.css']
})
export class CpManagementComponent {

  cpLogins = [
    { name: 'CP1 Music', email: 'cp1@example.com', username: 'cp1user', password: '123456' }
  ];

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
