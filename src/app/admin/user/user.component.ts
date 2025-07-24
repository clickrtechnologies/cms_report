import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/admin-models/user-login.model';
import { UserManagementService } from 'src/app/service/admin-service/user-management.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userLogins : UserLogin[] = [];

  constructor(private userManagementService: UserManagementService) {
    this.getUserLoginList();
  }

  // Fetch user logins from the service
  getUserLoginList(): void {
    this.userManagementService.getUserLogins().subscribe({
      next: (response: any) => {
        this.userLogins = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch user logins:', err);
        this.userLogins = [];
      }
    });
  }

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
