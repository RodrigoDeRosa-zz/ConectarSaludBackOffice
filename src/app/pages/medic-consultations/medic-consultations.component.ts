import { Component, OnInit } from '@angular/core';

import { ConsultationService } from '../../services/consultation.service';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-medic-consultations',
  templateUrl: './medic-consultations.component.html',
  styleUrls: ['./medic-consultations.component.css']
})
export class MedicConsultationsComponent implements OnInit {

  title = 'Consultas Médicas';
  nameAndLastname = 'Nombre y apellido: Juan Perez';
  license = 'M.N.: AVC123';
  speciality = 'Especialidad: Clínica';

  getConsultationButtonText = 'Obtener Consulta';

  private loadingErrorConsultationsMessage = 'Vuelva a intentarlo mas tarde.';
  private loadingErrorConsultationsTitle = 'Problema al reaizar la consulta medica';

  constructor(private _consultationsService: ConsultationService,
              private _toastr: ToastrService,
              private _router: Router,
              private _session: SessionService) { }

  ngOnInit() {
    const user = this._session.getUserFromSession();
    this.nameAndLastname = `Nombre y apellido: ${user.first_name} ${user.last_name}`;
    this.license = `M.N.: ${user.licence}`;
    this.speciality = `Especialidad: ${user.specialties}`;
  }

  getConsultationId() {
    const user = this._session.getUserFromSession();
    this._consultationsService.getConsultationGET({doctor: user.id})
      .subscribe(data => {
          this._router.navigate([`/medico/consultas/${data.consultation_id}/receta-indicaciones`,data]);
        },
        err => {
          console.error(err);
          this._toastr.error(this.loadingErrorConsultationsMessage,this.loadingErrorConsultationsTitle);
        });
  }
}
