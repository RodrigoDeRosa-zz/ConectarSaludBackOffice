import { Component, OnInit } from '@angular/core';

import { ConsultationService } from '../../services/consultation.service';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

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
              private _router: Router) { }

  ngOnInit() {
  }

  getConsultationId() {
    this._consultationsService.getConsultationGET({doctor: 'algo'})
      .subscribe(data => {
          console.log(data);
          console.log('generate consultation id and redirect d3b3e0df-7723-4766-ba82-24beea4899fa');
          this._router.navigate(['/admin/medicos/:id/receta-indicaciones',data.consultation_id]);
        },
        err => {
          console.error(err);
          this._toastr.error(this.loadingErrorConsultationsMessage,this.loadingErrorConsultationsTitle);
          this._router.navigate(['/admin/medicos']);
        });
  }
}
