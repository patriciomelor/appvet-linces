import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons} from 'ionicons';
import { add,pawOutline } from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';


// Definición de la interfaz 'Mascota'
export interface Mascota {
  imagen: String,
  nombre: String,
  especie: String,
  raza: String,
  edad: Number,
  sexo: Sexo
}

// Definición del enum (enumeración) 'Sexo'
export enum Sexo {
  Macho = 'Macho',
  Hembra = 'Hembra'
}

// Definición del componente Angular y su configuración
@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.page.html',
  styleUrls: ['./listar-mascotas.page.scss'],
  standalone: true,
  imports: [ HttpClientModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton, IonSearchbar]
})

// Arreglo mascotas ->Lista de objetos
export class ListarMascotasPage implements OnInit {
  searchTerm: string = '';

  mascotas: Mascota[] = [
    { imagen: '../../../assets/img/Doris.jpg', nombre: 'Doris', especie: 'Gata', raza: 'Mestiza', edad: 3, sexo: Sexo.Hembra},
    { imagen: '../../../assets/img/Lucio.jpg', nombre: 'Lucio', especie: 'Gato', raza: 'Mestizo', edad: 8, sexo: Sexo.Macho},
    { imagen: '../../../assets/img/Rex.jpg', nombre: 'Rex', especie: 'Perro', raza: 'Pastor alemán', edad: 5, sexo: Sexo.Macho,},
  ];


  constructor(private router: Router) {
    addIcons({add,pawOutline});
   }

  // Método para redirigir al Home
  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

  goToCreate(){
    this.router.navigate(['/agregar-mascota']);
  }
  goToRandom(){
    this.router.navigate(['/random'])
  }
  eliminarMascotas(index: number) {
    this.mascotas.splice(index, 1);
  }

}

