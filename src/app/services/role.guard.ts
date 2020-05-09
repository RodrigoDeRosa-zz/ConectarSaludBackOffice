import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {SessionService} from './session.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public router: Router, private sessionService:SessionService, private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const actualRole = this.sessionService.getUserFromSession();
    if (actualRole === null) {
      this.router.navigate(['/login']);
      return false;
    } else if (expectedRole !== actualRole.role){
      console.log(actualRole)
      this.toastr.error("El usuario ingresado no tiene permisos para acceder, por favor intente con otro",
        "Usuario No Autorizado")
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
