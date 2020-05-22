import { Component, OnInit } from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-pescription-and-indication',
  templateUrl: './pescription-and-indication.component.html',
  styleUrls: ['./pescription-and-indication.component.css']
})
export class PescriptionAndIndicationComponent implements OnInit {

  title = 'Ingrese a la aplicacion para unirse a la videollamada';
  prescriptionTitleText = 'Receta';
  dontApplyText = 'No aplica';
  medicTitleText = 'Atendido por';
  nameAndLastNameText = 'Nombre y apellido:';
  licenseText = 'M.N:';
  specialitiesText = 'Especialidades:';
  patientText = 'Ficha del Paciente';
  dateText = 'Fecha:';
  planText = 'Plan:';
  planNumberText = 'Afiliado N°:';
  prescriptionPlaceholder = 'Tafirol 400 mg x 12';
  footerText = 'RECETA GENERADA POR CONECTAR SALUD';
  patientPrescriptionText = 'Contenido de la receta';
  indicationsText = 'Indicaciones';
  indicationsPlaceholderText = 'Debe hacer reposo durante 3 dias';
  indicationsLabelText = 'Indicaciones para el paciente';
  finishButtonText = 'Finalizar Consulta';

  show = {
    indications: true,
    prescription: true
  };

  data: {
    prescription: string,
    indications: string
  };

  constructor() { }

  ngOnInit() {
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
    console.log(this.data);
  }
}
