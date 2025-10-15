import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getEducation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/education`);
  }

  getCertificates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certificates`);
  }

  createEducation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/education`, data);
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/education/${id}`);
  }

  createCertificate(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/certificates`, data);
  }

  deleteCertificate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/certificates/${id}`);
  }
}