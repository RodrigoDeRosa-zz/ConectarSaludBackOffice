import { Component, OnInit } from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DoctorsService} from '../../services/doctors.service';
import {RequestPrescriptionAndConsultationDto} from '../../models/request-prescription-and-consultation-dto';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pescription-and-indication',
  templateUrl: './pescription-and-indication.component.html',
  styleUrls: ['./pescription-and-indication.component.css']
})
export class PescriptionAndIndicationComponent implements OnInit {

  title = 'Ingrese a la aplicación para unirse a la videollamada con:';
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

  constructor(private _doctorsService: DoctorsService,
              private _toastr: ToastrService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    // mandatory params
    this.consultationId = this._route.snapshot.paramMap.get('id');
    // extra params
    console.log(this._route.snapshot.paramMap.get('other'));
    this.data = {
      prescription: '',
      indications: ''
    }

  }

  dontApply($event: MatCheckboxChange, type: string) {
    this.show[type] = !$event.checked;
    if($event.checked){
      this.data[type] = '';
    }
  }

  submit() {
    this._doctorsService.PatchPrescription({doctor_id: '123', consultation_id: this.consultationId, prescriptionAndConsultationDto: this.data})
      .subscribe(data => {
          this._toastr.error(this.savingSuccessPrescriptionMessage,this.savingSuccessPrescriptionTitle);
          this._router.navigate(['/admin/medicos/consultas']);
        },
        err => {
          console.error(err);
          this._toastr.error(this.savingErrorPrescriptionMessage,this.savingErrorPrescriptionTitle);
        });
  }
}
