import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import {RoleConstants} from "./constants/role.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ConectarSaludBackOffice';

  loggedInRole = 'Administrativo';

  buttons = [
    {
      title: 'HOME',
      href: '/'
    },
    {
      title: 'CUERPO MÉDICO',
      href: 'admin/medicos',
      role: RoleConstants.ADMIN_ROLE
    },
    {
      title: 'CONSULTAS',
      href: 'medico/consultas',
      role: RoleConstants.MEDIC_ROLE
    }
  ];

  userLoggedInRole: string;

  constructor(private _session: SessionService,
              private _router: Router,) {
  }

  ngOnInit(){
    const user = this._session.getUserFromSession();
    if(user){
      this.userLoggedInRole = user.role;
      switch (this.userLoggedInRole) {
        case RoleConstants.ADMIN_ROLE:
          this.loggedInRole = 'Administrativo';
          break;
        case RoleConstants.MEDIC_ROLE:
          this.loggedInRole = 'Médico';
          break;
        default:
          break;
      }
    }
  }

  showLoggedInInformation(){
    return this._session.getUserFromSession() !== null;
  }

  logout() {
    this._session.removeUserFromSession();
    this._router.navigate(['/login']);

  }
}
