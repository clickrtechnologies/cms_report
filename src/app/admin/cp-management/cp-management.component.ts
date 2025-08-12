import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpLogin } from 'src/app/models/admin-models/cp-login.model';
import { CpManagementService } from 'src/app/service/admin-service/cp-management.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cp-management',
  templateUrl: './cp-management.component.html',
  styleUrls: ['./cp-management.component.css']
})
export class CpManagementComponent implements AfterViewInit {

  cpLogins: CpLogin[] = [];
  newCpForm!: FormGroup;

  constructor(
    private cpManagementService: CpManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getCpLoginList();
    this.initForm();
  }

  // Initialize form controls
  initForm(): void {
    this.newCpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Fetch existing CP login list
  getCpLoginList(): void {
    this.cpManagementService.getCpLogins().subscribe({
      next: (response: any) => {
        this.cpLogins = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch CP login list:', err);
        this.cpLogins = [];
      }
    });
  }

  // Create new CP login
  createCpLogin(): void {
    if (this.newCpForm.invalid) {
      this.newCpForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.newCpForm.value.name,
      email: this.newCpForm.value.email,
      username: this.newCpForm.value.username,
      password: this.newCpForm.value.password,
      //role will be cp by default
      role: 'ROLE_CP'
    };

    this.cpManagementService.createCpLogin(payload).subscribe({
      next: (response: any) => {
        alert('CP Login created successfully!');
        this.cpLogins.push(response.data); // add to UI
        this.newCpForm.reset(); // reset form
      },
      error: (err: any) => {
        console.error('Failed to create CP login:', err);
        alert('Failed to create CP login.');
      }
    });
  }

  // Initialize DataTable after view loads
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

  simulateCpLogin(cp: CpLogin): void {
  this.cpManagementService.login(cp.username, cp.password).subscribe({
    next: (res) => {
      sessionStorage.setItem('cpUser', JSON.stringify(res.data));
      this.router.navigate(['cp/dashboard']);
    },
    error: () => {
      alert('Login failed for ' + cp.username);
    }
  });
}


  
}
