import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoInfo } from 'src/app/models/cp-models/geo-info.model';
import { Reports } from 'src/app/models/cp-models/report.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl + 'cpreport';
  
    constructor(private http: HttpClient) {}


  getReports(): Observable<Reports[]> {
      return this.http.get<Reports[]>(`${this.apiUrl}/getlist`);
    }

  getGeoList(): Observable<GeoInfo[]> {
    return this.http.get<GeoInfo[]>(`${this.apiUrl}/geoinfo/getlist`);
  }

}
