import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medic-consultations',
  templateUrl: './medic-consultations.component.html',
  styleUrls: ['./medic-consultations.component.css']
})
export class MedicConsultationsComponent implements OnInit {

  title = "Consultas Médicas";
  nameAndLastname = "Nombre y apellido: Juan Perez";
  license = "M.N.: AVC123";
  speciality = "Especialidad: Clínica";

  getConsultationButtonText = "Obtener Consulta";


  constructor() { }

  ngOnInit() {
  }

  getConsultationId() {
    console.log("generate consultation id and redirect")
  }
}
