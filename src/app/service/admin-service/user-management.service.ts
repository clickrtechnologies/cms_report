import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/admin-models/user-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  
  private apiUrl = environment.apiUrl+'userlogin';
              
  constructor(private http: HttpClient) {}

  getUserLogins(): Observable<UserLogin[]> {
    return this.http.get<UserLogin[]>(`${this.apiUrl}/getlist`);
  }
}
