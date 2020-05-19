import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private sessionService:SessionService) {}

  canActivate(): boolean {
    if (this.sessionService.getUserFromSession() === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
