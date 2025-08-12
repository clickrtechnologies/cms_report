import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CpLogin } from 'src/app/models/admin-models/cp-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CpManagementService{
  private apiUrl2 = environment.apiUrl+'userlogin';
  private apiUrl = environment.apiUrl+'cplogin';
         
    constructor(private http: HttpClient) {}

  getCpLogins(): Observable<CpLogin[]> {
     return this.http.get<CpLogin[]>(`${this.apiUrl2}/getcplogins`);
  }

  createCpLogin(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl2}/create`, payload);
}

login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }


}
