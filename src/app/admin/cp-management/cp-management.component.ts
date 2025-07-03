import { Component, AfterViewInit } from '@angular/core';

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
      $('#cpTable').DataTable({ pageLength: 5, scrollX: true });
    }, 100);
  }
}
