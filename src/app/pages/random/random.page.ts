import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Motion } from '@capacitor/motion';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonImg, IonFab, IonFabButton, IonIcon, IonCardTitle } from '@ionic/angular/standalone';


import { addIcons} from 'ionicons';
import { arrowBackOutline} from 'ionicons/icons';
import { catchError } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
  standalone: true,
  imports: [HttpClientModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonImg, IonFab, IonFabButton, IonIcon, IonCardTitle]
})
export class RandomPage implements OnInit {
mascota:any 

  constructor(private http:HttpClient,private router: Router) {
    addIcons({arrowBackOutline});
   }

  ngOnInit() {
    this.startShakeDetection();
  }

async startShakeDetection(){
  await Motion.addListener('accel',async (event) =>{
    console.log("TEST MOTION")
    const threshold = -1
    if(
      Math.abs(event.acceleration.x) > threshold &&
      Math.abs(event.acceleration.y) > threshold &&
      Math.abs(event.acceleration.z) > threshold 
    ){
      this.getRandomMascota()
    }
  })
}

async getRandomMascota(){
  try {
    const response = await this.http.get('https://674a70258680202966347ebc.mockapi.io/Pets').toPromise();
    
    // Verifica si la respuesta contiene al menos un elemento
    if (response && Array.isArray(response) && response.length > 0) {
      this.mascota = response[0]; // Toma la primera mascota
      console.log('Datos recibidos:', this.mascota);

    } else {
      console.log("No se pudo obtener la mascota");
    }
  } catch (error) {
    console.log("Error obteniendo random mascota por API:", error);
  }
}



goToListar(){
  this.router.navigate(['/listar-mascotas']);
}
}
