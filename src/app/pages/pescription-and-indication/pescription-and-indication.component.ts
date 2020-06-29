import { Component, OnInit } from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DoctorsService} from '../../services/doctors.service';
import {RequestPrescriptionAndConsultationDto} from '../../models/request-prescription-and-consultation-dto';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from "../../services/session.service";
import * as moment from 'moment/moment';

@Component({
  selector: 'app-pescription-and-indication',
  templateUrl: './pescription-and-indication.component.html',
  styleUrls: ['./pescription-and-indication.component.css']
})
export class PescriptionAndIndicationComponent implements OnInit {

  specialId = 'fjsa-231f-dcvi-432';
  onlyRead = false;

  title = 'Ingrese a la aplicación para unirse a la videollamada con:';
  titleReadOnly = 'Consulta realizada a:';
  prescriptionTitleText = 'Receta';
  dontApplyText = 'No aplica';
  medicTitleText = 'Atendido por';
  nameAndLastNameText = 'Nombre y apellido:';
  licenseText = 'M.N:';
  specialitiesText = 'Especialidades:';
  patientText = 'Ficha del Paciente';
  dateText = 'Fecha Generada:';
  planText = 'Plan:';
  planNumberText = 'Afiliado N°:';
  prescriptionPlaceholder = 'Tafirol 400 mg x 12';
  footerText = 'RECETA GENERADA POR CONECTAR SALUD';
  patientPrescriptionText = 'Contenido de la receta';
  indicationsText = 'Indicaciones';
  indicationsPlaceholderText = 'Debe hacer reposo durante 3 dias';
  indicationsLabelText = 'Indicaciones para el paciente';
  finishButtonText = 'Finalizar Consulta';
  backButtonText = 'Volver al histórico';

  private savingSuccessPrescriptionMessage = 'Receta e indicaciones cargadas correctamente';
  private savingErrorPrescriptionMessage = 'Vuelva a intentarlo nuevamente';
  private savingSuccessPrescriptionTitle = 'Consulta finalizada';
  private savingErrorPrescriptionTitle = 'Problema al guardar las recetas e indicaciones';

  show = {
    indications: true,
    prescription: true
  };

  data: RequestPrescriptionAndConsultationDto;

  private consultationId: string;
  affiliateData: { firstnameAndLastname: string; plan: string; planNumber: string };
  doctorData: { license: string; firstnameAndLastname: string; specialties: string };
  date: string;

  constructor(private _doctorsService: DoctorsService,
              private _toastr: ToastrService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _session: SessionService) { }

  ngOnInit() {
    // mandatory params
    this.consultationId = this._route.snapshot.paramMap.get('id');
    this.onlyRead = this.consultationId === this.specialId;
    // extra params
    this.date = this.onlyRead? 'TODO: modify':moment().format('DD-MM-YYYY');
    this.affiliateData = {
      firstnameAndLastname: this._route.snapshot.paramMap.get('affiliate_first_name')+' '+this._route.snapshot.paramMap.get('affiliate_last_name'),
      plan: this._route.snapshot.paramMap.get('affiliate_plan'),
      planNumber: this._route.snapshot.paramMap.get('affiliate_id')
    };
    this.data = {
      prescription: this.onlyRead? 'TODO: modify':'',
      indications: this.onlyRead? 'TODO: modify':'',
    };
    // doctor data
    const user = this._session.getUserFromSession();
    this.doctorData = {
      firstnameAndLastname: `${user.first_name} ${user.last_name}`,
      license: `${user.licence}`,
      specialties: `${user.specialties}`,
    }
  }

  dontApply($event: MatCheckboxChange, type: string) {
    this.show[type] = !$event.checked;
    if($event.checked){
      this.data[type] = '';
    }
  }

  submit() {
    const doctor = this._session.getUserFromSession();
    this._doctorsService.PatchPrescription({doctor_id: doctor.id, consultation_id: this.consultationId, prescriptionAndConsultationDto: this.data})
      .subscribe(data => {
          this._toastr.success(this.savingSuccessPrescriptionMessage,this.savingSuccessPrescriptionTitle);
          this._router.navigate(['/medico/historico']);
        },
        err => {
          console.error(err);
          this._toastr.error(this.savingErrorPrescriptionMessage,this.savingErrorPrescriptionTitle);
        });
  }

  backToHistory() {
    this._router.navigate(['/medico/historico']);
  }
}
