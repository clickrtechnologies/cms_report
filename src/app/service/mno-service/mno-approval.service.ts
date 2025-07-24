import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MnoApprovalService {
   private apiUrl = environment.apiUrl + 'mnoapproval';
    
      constructor(private http: HttpClient) {}

  getApprovals():Observable<MnoApproval[]> {
    return this.http.get<MnoApproval[]>(`${this.apiUrl}/getlist`);
  }
}
