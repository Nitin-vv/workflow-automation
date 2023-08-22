import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authorization');
    if (token !== null || '') {
      return true;
    } else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }

}
