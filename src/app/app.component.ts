import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

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
      title: 'CUERPO MÉDICO',
      href: 'admin/medicos'
    },
    {
      title: 'CONSULTAS',
      href: 'medico/consultas'
    }
  ];

  constructor(private _session: SessionService,
              private _router: Router,) {
  }

  ngOnInit(){
    const user = this._session.getUserFromSession();
    if(user){
      switch (user.role) {
        case 'admin':
          this.loggedInRole = 'Administrativo';
          break;
        case 'medic':
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
