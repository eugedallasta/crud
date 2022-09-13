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

  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppURL}${this.myApiURL}${id}`);
  }

  addPersona(persona: Persona): Observable<void> {
    return this.http.post<void>(`${this.myAppURL}${this.myApiURL}`, persona);
  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.myAppURL}${this.myApiURL}${id}`)
  }

  updatePersona(id: number, persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.myAppURL}${this.myApiURL}${id}`, persona);
  }
}
