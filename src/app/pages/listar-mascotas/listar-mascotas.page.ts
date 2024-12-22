import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pawOutline } from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';  // Importa el servicio StorageService

export interface Mascota {
  imagen: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  sexo: Sexo;
}

export enum Sexo {
  Macho = 'Macho',
  Hembra = 'Hembra'
}

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.page.html',
  styleUrls: ['./listar-mascotas.page.scss'],
  standalone: true,
  imports: [HttpClientModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton, IonSearchbar]
})

export class ListarMascotasPage implements OnInit {
  searchTerm: string = '';
  mascotas: Mascota[] = [];

  constructor(private router: Router, private storageService: StorageService) {
    addIcons({ add, pawOutline });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  async ngOnInit() {
    await this.obtenerDataApi();
  }

  goToCreate() {
    this.router.navigate(['/agregar-mascota']);
  }

  goToRandom() {
    this.router.navigate(['/random']);
  }

  async eliminarMascotas(index: number) {
    const nombreMascota = this.mascotas[index].nombre;
    await this.storageService.eliminarMascota(nombreMascota);
    this.mascotas.splice(index, 1);
  }

  async obtenerDataApi() {
    const url = `https://674a70258680202966347ebc.mockapi.io/Pets`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        const mascotasFromApi = data.map((mascota: any) => ({
          imagen: mascota.imagen,
          nombre: mascota.nombre,
          especie: mascota.especie,
          raza: mascota.raza,
          edad: mascota.edad,
          sexo: mascota.sexo
        }));

        // Guardar las mascotas en IndexedDB
        await this.storageService.registerMascotas(mascotasFromApi);
        this.mascotas = mascotasFromApi;
      }
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
      // Si hay un error al obtener datos de la API, intentamos obtenerlas desde IndexedDB
      const storedMascotas = await this.storageService.getMascotas();
      if (storedMascotas.length > 0) {
        this.mascotas = storedMascotas;
      } else {
        console.log('No hay mascotas almacenadas en IndexedDB');
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
