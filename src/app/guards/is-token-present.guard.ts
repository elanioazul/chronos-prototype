import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

export const isTokenPresentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userToken = inject(AuthService).isTokenStoraged();
  return userToken || router.navigate(['barrier']);
};
