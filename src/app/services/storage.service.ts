import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';

export interface Usuario {
  email:string;
  password: string;
  firstName: string;
  lastName: string;
}

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

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    const value = await this._storage?.get(key);
    console.log(`Getting key: ${key}, value:`, value);
    return value;
  }

  public async isEmpty(): Promise<boolean> {
    const keys = await this._storage?.keys();
    return keys?.length === 0;
  }

  public async registerMascotas(mascotas: Mascota[]) {
    await this.set('mascotas', mascotas);
  }

  public async getMascotas(): Promise<Mascota[]> {
    const mascotas = await this.get('mascotas');
    return mascotas ? mascotas : [];
  }

  public async registerUser(email: string, password: string, firstName: string, lastName: string) {
    const hashPass = await bcrypt.hash(password, 10);
    const user: Usuario = { email, password: hashPass, firstName, lastName };
    const users = await this.get('usuarios') || [];
    users.push(user);
    await this.set('usuarios', users);
  }

  public async loginUser(email: string, password: string) {
    const users = await this.get('usuarios') || [];
    const user = users.find((u: Usuario) => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    } else {
      return false;
    }
  }

  public async eliminarMascota(nombre: string): Promise<void> {
    const mascotas = await this.getMascotas();
    const updatedMascotas = mascotas.filter((mascota: Mascota) => mascota.nombre !== nombre);
    await this.set('mascotas', updatedMascotas);
  }
}
