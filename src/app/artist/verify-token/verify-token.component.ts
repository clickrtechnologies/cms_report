import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
   const token = this.route.snapshot.paramMap.get('token');
   console.log('Token received:', token);


    this.http.get<any>(`http://localhost:8084/token/verify/${token}`)
  .subscribe({
    next: (res) => {
      // Save token in sessionStorage/localStorage
      sessionStorage.setItem("accessToken", res.accessToken);
      sessionStorage.setItem("id", res.id);
      sessionStorage.setItem("userRole", res.role);

      // Redirect to approval page
      this.router.navigate(['/artist/approvals']);

    },
    error: (err) => {
      console.error("Invalid or expired token", err);
    }
  });

  }
}
