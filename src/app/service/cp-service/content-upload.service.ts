import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentUpload } from 'src/app/models/cp-models/content-upload.model';
import { environment } from 'src/environments/environment';
import { ArtistLogin } from 'src/app/models/admin-models/artist-login.model';
import { MnoLogin } from 'src/app/models/admin-models/mno-login.model';

@Injectable({
  providedIn: 'root'
})
export class ContentUploadService {
  private apiUrl = environment.apiUrl + 'contentuploadcontroller';
  private apiUrl2 = environment.apiUrl+'userlogin';

  constructor(private http: HttpClient) {}

  getUploads(): Observable<ContentUpload[]> {
    return this.http.get<ContentUpload[]>(`${this.apiUrl}/getlist`);
  }

 saveContent(songData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/cpcontentsong`, songData);
}


  getAllSongContent(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getSongContent`);
}

uploadAudio(formData: FormData) {
  return this.http.post<{ url: string }>(`${this.apiUrl}/audio/upload`, formData);
}

deleteContentById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  
  getArtistNames(): Observable<any> {
   return this.http.get<ArtistLogin[]>(`${this.apiUrl2}/getartistlogins`);
}

getMnoList(): Observable<any> {
   return this.http.get<MnoLogin[]>(`${this.apiUrl2}/getmnologins`);
}



}
