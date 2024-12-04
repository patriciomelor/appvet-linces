import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonText, IonSelect, IonSelectOption, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TakePhotoService} from '../../services/take-photo.service'
import { addIcons} from 'ionicons';
import { add,listOutline,arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.page.html',
  styleUrls: ['./agregar-mascota.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonText, IonSelect, IonSelectOption, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent]
})
export class AgregarMascotaPage implements OnInit {

  mascotaNombre: string = '';
  mascotaEspecie: string = '';
  mascotaRaza: string = '';
  mascotaEdad: string = '';
  mascotaSexo: string ='';
  photo: string | null = null; 
  location: { latitude: number; longitude: number} | null = null;
  address: string | null = null;
  

  constructor(private router:Router, private takePhotoService: TakePhotoService) { 
    addIcons({add,listOutline,arrowBackOutline});

  }

  ngOnInit() {
  }

async capturePhoto(){
  const result = await this.takePhotoService.takePhoto();
  console.log('Foto y ubicación', result)
  if(result){
    this.photo = result.photo;
    this.location = result.location;
    this.address = result.address;
  }
}
// Método para redirigir al Home
  goHome() {
    this.router.navigate(['/home']);
  }
  
  cerrarFormulario() {
    // Lógica para cerrar el formulario
  }
  

  goToCreate(){
    this.router.navigate(['/animal-form']);
  }

  goToRandom(){
    this.router.navigate(['/listar-mascotas'])
  }

  goToListar(){
    this.router.navigate(['/listar-mascotas'])
  }

  onSubmit(form:any){
    if (form.valid) {
      console.log('Formulario válido', this.mascotaNombre, this.mascotaEspecie, this.mascotaRaza, this.mascotaEdad, this.mascotaSexo);
      this.goToListar();
    }else{
      console.log('Formulario inválido')
    }


  }
}


