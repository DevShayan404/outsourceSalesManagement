import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const _router = inject(Router);
  let isLoggedIn = sessionStorage.getItem('token');
  if (!isLoggedIn) {
    _router.navigate(['auth/login']);
    return false;
  } else {
    return true;
  }
};

export const customAuthGuard: CanActivateFn = () => {
  const _router = inject(Router);
  let isLoggedIn = sessionStorage.getItem('token');
  if (isLoggedIn) {
    _router.navigate(['dashboard/add-user']);
    return false;
  } else {
    return true;
  }
};
