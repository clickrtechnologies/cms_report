import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistLogin } from 'src/app/models/admin-models/artist-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistManagementService {
  private apiUrl = environment.apiUrl+'artistlogin';
           
      constructor(private http: HttpClient) {}

  getArtistLogins(): Observable<ArtistLogin[]> {
    return this.http.get<ArtistLogin[]>(`${this.apiUrl}/getlist`);
  }

  createArtistLogin(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/create`, payload);
}

  login(username: string, password: string): Observable<any> {
      const payload = { username, password };
      return this.http.post(`${this.apiUrl}/login`, payload);
    }
}
