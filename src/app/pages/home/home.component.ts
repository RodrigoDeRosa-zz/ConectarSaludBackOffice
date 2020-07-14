import { Component, OnInit } from '@angular/core';
import {ABMGenericFormField} from '../../models/generic-form-field';
import {DoctorsService} from '../../services/doctors.service';
import * as _ from 'lodash';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  INDEX_DOCTOR_SELECT = 0;

  ratingsTitleText = 'Calificaciones';
  consultationsTitleText = 'Consultas por especialidad';

  specialitiesData = {
    'total': 69,
    'by_specialty': [
      {
        'specialty': 'Medicina general',
        'count': 42
      },
      {
        'specialty': 'Pediatría',
        'count': 27
      }
    ]
  };
  specialitiesTitle = 'Cantidad de consultas por especialidad';
  specialitiesSeriesName = 'Consultas';

  ratingsData = [
    {
      'date': '23-08-2020',
      'average_score': 4.32
    },
    {
      'date': '24-08-2020',
      'average_score': 1.00
    },
    {
      'date': '23-09-2020',
      'average_score': 3.20
    }
  ];
  ratingsTitle = 'Promedio de calificaciones diarias';
  ratingsSeriesName = 'Calificación';
  ratingsXAxisTitle = 'Día';

  ratingFilterData = [
    new ABMGenericFormField({ name: 'doctor', value: '', title: 'Doctor', type: 'select', size: 'span-4', offsetRight: 'span-8', lookups: []}),
    new ABMGenericFormField({ name: 'specialties', value: '', title: 'Especialidades', type: 'select', size: 'span-4', offsetRight: 'span-8',
      lookups: [
        { value: 'Inmunología', key: 'Inmunología' },
        { value: 'Cardiología', key: 'Cardiología' },
        { value: 'Dermatología', key: 'Dermatología' },
        { value: 'Endocrinología', key: 'Endocrinología' },
        { value: 'Fisiatría', key: 'Fisiatría' },
        { value: 'Gastronenterología', key: 'Gastronenterología' },
        { value: 'Ginecología', key: 'Ginecología' },
        { value: 'Infectología', key: 'Infectología' },
        { value: 'Medicina general', key: 'Medicina general' },
        { value: 'Neumonología', key: 'Neumonología' },
        { value: 'Neurología', key: 'Neurología' },
        { value: 'Nutrición', key: 'Nutrición' },
        { value: 'Otorrinonaringología', key: 'Otorrinonaringología' },
        { value: 'Pediatría', key: 'Pediatría' },
        { value: 'Psiquiatría', key: 'Psiquiatría' },
        { value: 'Urología', key: 'Urología' },
      ]}),
    new ABMGenericFormField({ name: 'date_begin', value: '', title: 'Fecha desde', type: 'date', size: 'span-5' }),
    new ABMGenericFormField({ name: 'date_end', value: '', title: 'Fecha hasta', type: 'date', size: 'span-4' }),
    new ABMGenericFormField({ name: 'submit', value: '', title: 'Filtrar', type: 'submit', size: 'span-1' }),
  ];

  consultationsFilterData = [];

  private user: any;

  constructor(private _doctorService: DoctorsService,
              private _sessionService: SessionService) {
  }

  ngOnInit() {
    this.user = this._sessionService.getUserFromSession();

    // initialize lookups
    this._doctorService.getAllDoctorsUsingGET({}).subscribe(data => {
      this.ratingFilterData[this.INDEX_DOCTOR_SELECT].lookups = _.map(data, (req) =>
        ({ key: req.id, value: req.first_name+' '+req.last_name })
      );
    });

    if(this.isDoctorLoggedIn()){
      this.ratingFilterData[this.INDEX_DOCTOR_SELECT].value = '71c4a137-601d-425d-8a95-7208b0c0ae73';
      this.ratingFilterData[this.INDEX_DOCTOR_SELECT].disabled = true;
    }

    // initialize second filter
    this.ratingFilterData.forEach(val => val.name != 'doctor'? this.consultationsFilterData.push(Object.assign({}, val)):[]);

    // clean buttons
    this.ratingFilterData.push( new ABMGenericFormField(
      { name: 'button',
        value: '',
        title: 'Limpiar',
        color: 'primary',
        type: 'button',
        size: 'span-1',
        execute: (value) => this.cleanForm('ratingFilterData') }));

    this.consultationsFilterData.push( new ABMGenericFormField(
      { name: 'button',
        value: '',
        title: 'Limpiar',
        color: 'primary',
        type: 'button',
        size: 'span-1',
        execute: (value) => this.cleanForm('consultationsFilterData') }));
  }

  cleanForm(key){
    this[key] = this[key].map((field) => {
      field.value = (this.isDoctorLoggedIn() && field.name != 'doctor' || !this.isDoctorLoggedIn())?'':field.value;
      return field;
    });
  }

  isDoctorLoggedIn(){
    return this.user.role !== 'admin';
  }

}
