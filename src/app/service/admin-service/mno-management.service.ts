import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MnoLogin } from 'src/app/models/admin-models/mno-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MnoManagementService {
 private apiUrl = environment.apiUrl+'mnologin';
            
       constructor(private http: HttpClient) {}

  getMnoLogins(): Observable<MnoLogin[]> {
    return this.http.get<MnoLogin[]>(`${this.apiUrl}/getlist`);
  }
}
