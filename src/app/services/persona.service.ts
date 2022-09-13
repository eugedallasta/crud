import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private myAppURL: string;
  private myApiURL: string;

  constructor(private http: HttpClient) {
    this.myAppURL = environment.endpoint;
    this.myApiURL = 'api/personas/';
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.myAppURL}${this.myApiURL}`);
  }
}
