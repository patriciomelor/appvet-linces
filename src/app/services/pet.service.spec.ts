import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private apiUrl = 'https://674a70258680202966347ebc.mockapi.io/Pets';  // Reemplaza con la URL real de la API de mascotas

  constructor(private http: HttpClient) {}

  // Método para obtener las mascotas desde la API
  getPets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Devuelve un observable de un array de mascotas
  }
}

