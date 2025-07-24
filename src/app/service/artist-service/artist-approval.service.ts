// src/app/contract.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistApproval } from 'src/app/models/artist-models/artist-approval.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

 private apiUrl = environment.apiUrl + 'artistapproval';
       
  constructor(private http: HttpClient) {}

  getApprovals(): Observable<ArtistApproval[]> {
    return this.http.get<ArtistApproval[]>(`${this.apiUrl}/getlist`);
  }
}
