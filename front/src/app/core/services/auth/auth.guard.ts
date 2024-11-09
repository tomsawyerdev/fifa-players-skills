import {Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //console.log("authGuard, isLogged:",authService.isLogged());
  if (authService.isLogged()) {
      return true; 
    } else {
      // Redirect to the login page
      router.navigate(['/session']);
      return false;
    }
 
};
