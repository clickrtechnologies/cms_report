import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentUpload } from 'src/app/models/cp-models/content-upload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentUploadService {
  private apiUrl = environment.apiUrl + 'contentuploadcontroller';

  constructor(private http: HttpClient) {}

  getUploads(): Observable<ContentUpload[]> {
    return this.http.get<ContentUpload[]>(`${this.apiUrl}/getlist`);
  }
}
