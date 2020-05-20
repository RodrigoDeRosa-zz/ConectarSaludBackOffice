import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConectarSaludBackOffice';

  buttons = [
    {
      title: 'CUERPO MÉDICO',
      href: 'admin/medicos'
    },
    {
      title: 'CONSULTAS',
      href: 'medico/consultas'
    }
  ]
}
