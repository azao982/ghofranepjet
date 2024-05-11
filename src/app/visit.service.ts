import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from './visiteur';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = 'http://localhost:9095/api';

  constructor(private http: HttpClient) { }
  regist(user: any): Observable<any> {
    const url = `${this.apiUrl}/regist`;
    return this.http.post(url, user);
  }
  log(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/log`;
    return this.http.post<any>(url, credentials);
  }  
  listvisit(): Observable<Visit[]> { // Spécifiez le type de données attendu (dans cet exemple, Visit[])
    const url = `${this.apiUrl}/visiteurss`;
    return this.http.get<Visit[]>(url); // Ajoutez le type de données attendu ici
}
}

