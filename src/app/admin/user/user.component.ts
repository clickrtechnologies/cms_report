import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userLogins = [
    { name: 'Admin User', email: 'admin@example.com', username: 'admin', password: '123456' }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#userTable').DataTable({ 
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
