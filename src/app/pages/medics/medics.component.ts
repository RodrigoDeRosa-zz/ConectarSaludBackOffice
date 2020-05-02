import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { FormTab } from '../../models/form-tab';
import { TableColumns } from '../../models/table-columns';
import { ABMGenericFormField } from '../../models/generic-form-field';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {

  listTab: FormTab = new FormTab('list');
  createTab: FormTab = new FormTab('form');
  editTab: FormTab;

  /*
   * Columnas que se mostrarán
   */
  columns: TableColumns[] = [
    {
      name: 'Nombre',
      key: 'name'
    },
    {
      name: 'Apellido',
      key: 'surname'
    },
    {
      name: 'DNI',
      key: 'dni'
    },
    {
      name: 'Email',
      key: 'email'
    },
    {
      name: 'Matricula',
      key: 'licence'
    },
    {
      name: 'Especialidades',
      key: 'specialities'
    },
    {
      name: 'Centros',
      key: 'centers'
    },
    {
      name: 'Disponibilidad',
      key: 'availability'
    },
    {
      name: 'Disponible?',
      key: 'available'
    },
  ];

  /**
   * Campos del formulario de creación
   */
  createFields: ABMGenericFormField[];

  /**
   * Campos del formulario de edición
   */
  editFields: any[];

  /**
   * Indica cual tab se encuentra activo
   */
  selected = new FormControl(0);

  /*
   * Los valores extraidos de los formularios
   * Habría que resetearlo cada vez que se pasa de formulario a formulario
   */
  values: any;

  /**
   * Respuesta devuelta por el servidor
   */
  responseData: any;

  /**
   * Paginacion de datos
   */
  responsePagination: any;

  private filters: {};

  /*
	 * Paginacion de la tabla
	 */
  public pagination = {
    page: 0,
    size: 10,
    totalRecords: 2
  }

  constructor() {}

  ngOnInit() {
    this.listTab.contentList.columns = this.columns;
    this.listTab.contentList.tableConfiguration.onChangePage = this.changePage;

    this.createTab = new FormTab('form');
    this.editTab = new FormTab('form');

    this.createTab.contentForm.data = [
      new ABMGenericFormField({ name: 'name', value: "", title: 'Nombre', type: 'text', validators: [Validators.required], size: 'span-3' }),
      new ABMGenericFormField({ name: 'surname', value: "", title: 'Apellido', type: 'text', validators: [Validators.required], size: 'span-3' }),
      new ABMGenericFormField({ name: 'dni', value: "", title: 'DNI', type: 'text', validators: [Validators.required], size: 'span-3', disabled: false }),
      new ABMGenericFormField({ name: 'email', value: "", title: 'Correo electrónico', type: 'text', validators: [Validators.required], size: 'span-3' }),
      new ABMGenericFormField({ name: 'licence', value: "", title: 'Matricula', type: 'text', validators: [Validators.required], size: 'span-6' }),
      new ABMGenericFormField({ name: 'specialities', value: "", title: 'Especialidades', type: 'text', validators: [Validators.required], size: 'span-6' }),
      new ABMGenericFormField({ name: 'centers', value: "", title: 'Centros de salud', type: 'text', validators: [Validators.required], size: 'span-6' }),
      new ABMGenericFormField({ name: 'availability', value: "", title: 'Disponibilidad', type: 'text', validators: [Validators.required], size: 'span-6' }),
    ];

    this.editTab.contentForm.data = _.cloneDeep(this.createTab.contentForm.data);

    this.createTab.contentForm.formConfiguration.onSubmit = this.submitCreate;
    this.editTab.contentForm.formConfiguration.onSubmit = this.submitEdit;

    this.getAllMedics();
  }

  private getAllMedics(onComplete = function () { }) {
    //this.filters = Object.assign(this.filters, this.pagination, { sort: 'apellido', size: 10, page: 0 });

    // call to api
    this.responseData = [
      {
        name: "Jhon",
        surname: "Doe",
        dni: "23456789",
        email: "john@doe.com",
        licence: "12342",
        specialities: [
          "Clinic",
          "Pediatric"
        ],
        centers: [
          "Hospital Pirovano"
        ],
        availability: [
          {
            day: "Lunes",
            from: "18:00",
            to: "18:30"
          },
          {
            day: "Martes",
            from: "18:00",
            to: "18:30"
          }
        ],
        is_available: true
      }
    ];
    //this.responsePagination = resp.body.page;

    this.listTab.contentList.data = _.map(this.responseData, function (req) {
      let available;
      if (req.is_available) {
        available = 'SI';
      } else {
        available = 'NO';
      }

      return {
        name: req.name,
        surname: req.surname,
        dni: req.dni,
        email: req.email,
        licence: req.licence,
        specialities: req.specialities.join('/'),
        centers: req.centers.join('/'),
        availability: req.availability.map((r) => {
          return r.day+': '+r.from+' a '+r.to
        }).join('/'),
        available
      }
    });

    /*this.listTab.contentList.pagination = {
      page: this.responsePagination.number,
      size: this.responsePagination.size,
      totalRecords: this.responsePagination.totalElements
    };*/

    onComplete();

  }

  changePage = (event) => {
    this.filters = Object.assign(this.filters, this.pagination, { sort: 'apellido', size: event.pageSize, page: event.pageIndex });


  }

  submitCreate = (values: any = {}, callback = (res) => { }) => {
    console.log(values)
    callback({ success: { status: 200, message: "Los campos fueron insertados" } });
    //callback({ error: { status: 400, message: "Los campos fueron insertados" } });
  }

  submitEdit = (values: any = {}, callback: Function = (res) => { }) => {
    console.log(values)
    callback({ success: { status: 200, message: "Los campos fueron modificados" } });
    //callback({ error: { status: 400, message: "Los campos fueron insertados" } });
  }

}
