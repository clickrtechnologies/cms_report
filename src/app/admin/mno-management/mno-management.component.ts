import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-mno-management',
  templateUrl: './mno-management.component.html',
  styleUrls: ['./mno-management.component.css']
})
export class MnoManagementComponent {

  mnoLogins = [
    { telco: 'Airtel', name: 'MNO Head', email: 'mno@example.com', username: 'mnohead', password: '123456' }
  ];


  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#mnoTable').DataTable({ pageLength: 5, scrollX: true });
    }, 100);
  }
}
