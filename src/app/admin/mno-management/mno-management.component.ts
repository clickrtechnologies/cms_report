
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MnoLogin } from 'src/app/models/admin-models/mno-login.model';
import { MnoManagementService } from 'src/app/service/admin-service/mno-management.service';

declare var $: any;

@Component({
  selector: 'app-mno-management',
  templateUrl: './mno-management.component.html',
  styleUrls: ['./mno-management.component.css']
})
export class MnoManagementComponent implements AfterViewInit {
  mnoLogins: MnoLogin[] = [];
  newMnoForm!: FormGroup;

  constructor(
    private mnoManagementService: MnoManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getMnoLoginList();
    this.initForm();
  }

  // Initialize the form group
  initForm(): void {
    this.newMnoForm = this.fb.group({
      telco: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Fetch MNO logins from the service
  getMnoLoginList(): void {
    this.mnoManagementService.getMnoLogins().subscribe({
      next: (response: any) => {
        this.mnoLogins = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch MNO logins:', err);
        this.mnoLogins = [];
      }
    });
  }

  // Create new MNO login
  createMnoLogin(): void {
    if (this.newMnoForm.invalid) {
      this.newMnoForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.newMnoForm.value.name,
      email: this.newMnoForm.value.email,
      username: this.newMnoForm.value.username,
      password: this.newMnoForm.value.password,
      telco: this.newMnoForm.value.telco,
      //role will be mno by default
      role: 'ROLE_MNO'
    };
    this.mnoManagementService.createMnoLogin(payload).subscribe({
      next: (response: any) => {
        alert('MNO Login created successfully!');
        this.mnoLogins.push(response.data);
        this.newMnoForm.reset();
      },
      error: (err: any) => {
        console.error('Failed to create MNO login:', err);
        alert('Failed to create MNO login.');
      }
    });
  }

  // Login as MNO
  mnoLoginAs(mno: MnoLogin): void {
    this.mnoManagementService.login(mno.username, mno.password).subscribe({
      next: (res) => {
        sessionStorage.setItem('mnoUser', JSON.stringify(res.data));
        this.router.navigate(['/mno/dashboard']);
      },
      error: () => {
        alert('Login failed for ' + mno.username);
      }
    });
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
