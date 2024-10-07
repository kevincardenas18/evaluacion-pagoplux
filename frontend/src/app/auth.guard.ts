import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.authService.protected(token).pipe(
        map((response) => {
          // Aquí validamos que la respuesta sea un objeto JSON y contenga la propiedad message
          if (response && response.message) {
            console.log('Token válido:', response.message);
            return true; // Permitir el acceso
          } else {
            // Si la respuesta no contiene un mensaje, redirigir al login
            this.router.navigate(['/signin']);
            console.log('Token inválido o respuesta inesperada');
            return false;
          }
        }),
        catchError((error) => {
          console.error('Error en la validación del token:', error);
          this.router.navigate(['/signin']);
          return of(false);
        })
      );
    } else {
      console.warn('No hay token en localStorage, redirigiendo al login');
      this.router.navigate(['/signin']);
      return of(false);
    }
  }
}
