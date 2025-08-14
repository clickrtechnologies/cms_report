import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MnoApproval } from 'src/app/models/mno-models/mno-approval.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MnoApprovalService {
   private apiUrl = environment.apiUrl + 'mnocontroller';
    
      constructor(private http: HttpClient) {}

  // getApprovals():Observable<MnoApproval[]> {
  //   return this.http.get<MnoApproval[]>(`${this.apiUrl}/getlist`);
  // }

  //get mno content for respective mno
    getMnoSongContent(mnoId: number): Observable<MnoApproval[]> {
      return this.http.get<MnoApproval[]>(`${this.apiUrl}/getmnosongcontent/${mnoId}`);
    }

    approveSong(approval: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve`, approval);
  }
}
