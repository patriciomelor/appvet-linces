import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'listar-mascotas',
    loadComponent: () => import('./pages/listar-mascotas/listar-mascotas.page').then( m => m.ListarMascotasPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'agregar-mascota',
    loadComponent: () => import('./pages/agregar-mascota/agregar-mascota.page').then( m => m.AgregarMascotaPage)
  },  {
    path: 'random',
    loadComponent: () => import('./pages/random/random.page').then( m => m.RandomPage)
  },




];
