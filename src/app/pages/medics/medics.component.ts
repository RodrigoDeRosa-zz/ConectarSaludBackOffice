import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';

import { FormTab } from '../../models/form-tab';
import { TableColumns } from '../../models/table-columns';
import { ABMGenericFormField } from '../../models/generic-form-field';
import {DoctorsService} from '../../services/doctors.service';

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
      key: 'first_name'
    },
    {
      name: 'Apellido',
      key: 'last_name'
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
      key: 'specialties'
    },
    {
      name: 'Centros',
      key: 'centers'
    },
    {
      name: 'Disponibilidad',
      key: 'availability_times',
      formattedTableResult: (values) => {
        return values.map((values) => {
          return values.day+' '+values.from_time+' a '+values.to_time;
        });
      }
    },
    {
      name: 'Disponible?',
      key: 'available'
    },
    {
      name: 'Acciones',
      key: 'action',
      isAction: true,
      actions: [
        {
          name: 'delete',
          icon: 'delete',
          execute: (value) => {
            console.log(value);
          }
        },
      ]
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

  constructor(private _toastr: ToastrService,
              private _doctorsService: DoctorsService) {}

  ngOnInit() {
    this.listTab.contentList.columns = this.columns;
    this.listTab.contentList.tableConfiguration.onChangePage = this.changePage;

    this.createTab = new FormTab('form');
    this.editTab = new FormTab('form');

    this.createTab.contentForm.data = [
      new ABMGenericFormField({ name: 'first_name', value: '', title: 'Nombre', type: 'text', validators: [Validators.required], size: 'span-3' }),
      new ABMGenericFormField({ name: 'last_name', value: '', title: 'Apellido', type: 'text', validators: [Validators.required], size: 'span-3' }),
      new ABMGenericFormField({ name: 'dni', value: '', title: 'DNI', type: 'text', validators: [Validators.required], size: 'span-3', disabled: false }),
      new ABMGenericFormField({ name: 'email', value: '', title: 'Correo electrónico', type: 'text', validators: [Validators.required, Validators.email], size: 'span-3' }),
      new ABMGenericFormField({ name: 'licence', value: '', title: 'Matricula', type: 'text', validators: [Validators.required], size: 'span-6' }),
      new ABMGenericFormField({ name: 'specialties', value: '', title: 'Especialidades', type: 'select', validators: [Validators.required], size: 'span-6',
        multi: true, lookups: [{ value: 'Clinic', key: 'Clinic' }, { value: 'Pediatric', key: 'Pediatric' }]
      }),
      new ABMGenericFormField({ name: 'centers', value: '', title: 'Centros de salud', type: 'select', validators: [Validators.required], size: 'span-6',
        multi: true, lookups: [{ value: 'Hospital', key: 'Hospital San Jose' }, { value: 'Hospital Hornos', key: 'Hospital Hornos' }]
      }),
      //new ABMGenericFormField({ name: 'availability_times', value: '', title: 'Disponibilidad', type: 'text', validators: [Validators.required], size: 'span-6' }),
      new ABMGenericFormField({ name: 'availability_times', value: '', title: 'Configuracion de disponibilidad', type: 'daily-and-hourly-range', validators: [Validators.required], size: 'span-6' })
    ];

    this.editTab.contentForm.data = _.cloneDeep(this.createTab.contentForm.data);

    this.createTab.contentForm.formConfiguration.onSubmit = this.submitCreate;
    this.editTab.contentForm.formConfiguration.onSubmit = this.submitEdit;

    this.getAllMedics();
  }

  private getAllMedics(onComplete = function () { }) {
    //this.filters = Object.assign(this.filters, this.pagination, { sort: 'apellido', size: 10, page: 0 });
    this._doctorsService.getAllDoctorsUsingGET({})
      .subscribe(data => {
        this.responseData = data;
        this.listTab.contentList.data = _.map(this.responseData, function (req) {
          let available;
          if (req.is_available) {
            available = 'SI';
          } else {
            available = 'NO';
          }

          return {
            id: req.id,
            first_name: req.first_name,
            last_name: req.last_name,
            dni: req.dni,
            email: req.email,
            licence: req.licence,
            specialties: req.specialties,
            centers: req.centers,
            availability_times: req.availability_times,
            available
          }
        });
      },
      err => {
        console.error(err);
        this._toastr.error("Refresque el sitio y vuelva a intentarlo.","Problema al listar medicos")
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


  };

  submitCreate = (values: any = {}, callback = (res) => { }) => {
    this._doctorsService.PostDoctor(values)
      .subscribe(data => {
        callback({ success: { status: 200, message: 'Profesional creado correctamente' } });
        this.getAllMedics();
      },
      err => {
        console.error(err);
        callback({error: { status: 400, title: "Problema al cargar el profesional", message: "Verifique que el DNI y la matrícula no hayan sido cargados en el sistema" }});
      });
  };

  submitEdit = (values: any = {}, callback: Function = (res) => { }) => {
    let id = this.editTab.contentForm.initValues.id;
    this._doctorsService.PatchDoctor({doctorDto: values,id})
      .subscribe(data => {
          callback({ success: { status: 200, message: 'Profesional guardado correctamente' } });
          this.getAllMedics();
        },
        err => {
          console.error(err);
          callback({error: { status: 400, title: "Problema al guardar los datos del profesional", message: "Verifique los datos ingresados" }});
        });
  }

}
