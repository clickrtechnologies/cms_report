import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/cp-models/song.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl + 'cpdashboardcontroller';
  private apiUrl1 = environment.apiUrl + 'contentuploadcontroller';
  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/getlist`);
  }

  getAllSongContent(id: any): Observable<any> {
  return this.http.get(`${this.apiUrl1}/getSongContent/${id}`);
}
}
