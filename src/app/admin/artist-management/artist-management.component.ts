import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtistLogin } from 'src/app/models/admin-models/artist-login.model';
import { ArtistManagementService } from 'src/app/service/admin-service/artist-management.service';

declare var $: any;

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.css']
})
export class ArtistManagementComponent implements AfterViewInit {

  artistLogins: ArtistLogin[] = [];
  newArtistForm!: FormGroup;

  constructor(
    private artistManagementService: ArtistManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getArtistLoginList();
    this.initForm();
  }

  // Initialize the form group
  initForm(): void {
    this.newArtistForm = this.fb.group({
      cpName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Fetch artist logins
  getArtistLoginList(): void {
    this.artistManagementService.getArtistLogins().subscribe({
      next: (response: any) => {
        this.artistLogins = Array.isArray(response.data) ? response.data : [];
      },
      error: (err: any) => {
        console.error('Failed to fetch artist logins:', err);
        this.artistLogins = [];
      }
    });
  }

  // Create new artist login
  createArtistLogin(): void {
    if (this.newArtistForm.invalid) {
      this.newArtistForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.newArtistForm.value.name,
      email: this.newArtistForm.value.email,
      username: this.newArtistForm.value.username,
      password: this.newArtistForm.value.password,
      cpName: this.newArtistForm.value.cpName,
      //role will be artist by default
      role: 'ROLE_ARTIST'
    };
    this.artistManagementService.createArtistLogin(payload).subscribe({
      next: (response: any) => {
        alert('Artist Login created successfully!');
        this.artistLogins.push(response.data);
        this.newArtistForm.reset();
      },
      error: (err: any) => {
        console.error('Failed to create artist login:', err);
        alert('Failed to create artist login.');
      }
    });
  }

  // Login as artist
  artistLoginAs(ar: ArtistLogin): void {
    this.artistManagementService.login(ar.username, ar.password).subscribe({
      next: (res) => {
        sessionStorage.setItem('artistUser', JSON.stringify(res.data));
        this.router.navigate(['/artist/dashboard']);
      },
      error: () => {
        alert('Login failed for ' + ar.username);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#artistTable').DataTable({
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
