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
      $('#userTable').DataTable({ pageLength: 5, scrollX: true });
    }, 100);
  }
}
