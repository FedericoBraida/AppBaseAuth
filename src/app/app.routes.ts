import { Routes } from '@angular/router';
import { authGuard, publicGuard } from "../core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',    
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component') //.then(m => m.default),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
      }
    ]
  }
];
