import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment/moment';

import {ABMGenericFormField} from '../../models/generic-form-field';
import {DoctorsService} from '../../services/doctors.service';
import {SessionService} from '../../services/session.service';
import {StaticsService} from '../../services/statics.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  INDEX_DOCTOR_SELECT = 0;

  ratingsTitleText = 'Calificaciones';
  consultationsTitleText = 'Consultas por especialidad';

  specialitiesData = {};
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
    new ABMGenericFormField({ name: 'doctor_id', value: '', title: 'Doctor', type: 'select', size: 'span-4', offsetRight: 'span-8', lookups: []}),
    new ABMGenericFormField({ name: 'specialty', value: '', title: 'Especialidades', type: 'select', size: 'span-4', offsetRight: 'span-8',
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
    new ABMGenericFormField({ name: 'from_date', value: '', title: 'Fecha desde', type: 'date', size: 'span-5' }),
    new ABMGenericFormField({ name: 'to_date', value: '', title: 'Fecha hasta', type: 'date', size: 'span-4' }),
    new ABMGenericFormField({ name: 'submit', value: '', title: 'Filtrar', type: 'submit', size: 'span-1' }),
  ];

  consultationsFilterData = [];

  private user: any;
  private ratingFilters = {};
  private consultationFilters = {};
  private dateFormat = 'DD-MM-YYYY';

  constructor(private _doctorService: DoctorsService,
              private _sessionService: SessionService,
              private _staticsService: StaticsService) {
  }

  ngOnInit() {
    this.user = this._sessionService.getUserFromSession();

    if(this.isDoctorLoggedIn()){
      this.ratingFilters.doctor_id = this.user.id;
    }

    // initialize data
    this.getScoreData();
    this.getConsultationsData();

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
    this.ratingFilterData.forEach(val => val.name != 'doctor_id' && val.name != 'specialty'? this.consultationsFilterData.push(Object.assign({}, val)):[]);

    // clean buttons
    this.ratingFilterData.push( new ABMGenericFormField(
      { name: 'button',
        value: '',
        title: 'Limpiar',
        color: 'primary',
        type: 'button',
        size: 'span-1',
        execute: (value) => this.cleanForm('ratingFilterData', 'ratingFilters', this.getScoreData.bind(this)) }));

    this.consultationsFilterData.push( new ABMGenericFormField(
      { name: 'button',
        value: '',
        title: 'Limpiar',
        color: 'primary',
        type: 'button',
        size: 'span-1',
        execute: (value) => this.cleanForm('consultationsFilterData', 'consultationFilters', this.getConsultationsData.bind(this)) }));
  }

  getScoreData(callback = () => {}){
    this._staticsService.getAllStaticsScoreUsingGET(this.ratingFilters).subscribe(data => {
      this.ratingsData = data.average_by_date;
      callback();
    });
  }

  getConsultationsData(callback = () => {}){
    this._staticsService.getAllConsultationsGET(this.consultationFilters).subscribe(data => {
      this.specialitiesData = {
        total: data.total,
        by_specialty: data.by_specialty
      };
      callback();
    });
  }

  cleanForm(key, filtersKey, getData){
    this[key] = this[key].map((field) => {
      field.value = (this.isDoctorLoggedIn() && field.name != 'doctor_id' || !this.isDoctorLoggedIn())?'':field.value;
      return field;
    });
    this[filtersKey] = {};
    getData();
  }

  isDoctorLoggedIn(){
    return this.user.role !== 'admin';
  }

  filterRatings(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
    this.parseDataFrom(callObject,'ratingFilters');
    this.getScoreData(() => callObject.onSubmitCallback({}));
  }

  filterConsultations(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
    this.parseDataFrom(callObject,'consultationFilters');
    this.getConsultationsData(() => callObject.onSubmitCallback({}));
  }

  private parseDataFrom(callObject: { values: any; onSubmitCallback: Function },key) {
    this[key] = callObject.values;
    if (callObject.values.from_date != '') {
      this[key].from_date = moment(this[key].from_date).format(this.dateFormat);
    }
    if (callObject.values.to_date != '') {
      this[key].to_date = moment(this[key].to_date).format(this.dateFormat);
    }
  }
}
