import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import * as moment from 'moment/moment';

import {TableColumns} from '../../models/table-columns';

import * as _ from 'lodash';
import {PageEvent} from "@angular/material/paginator";
import {ABMGenericFormField} from "../../models/generic-form-field";
import {ConsultationService} from "../../services/consultation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-medic-history',
  templateUrl: './medic-history.component.html',
  styleUrls: ['./medic-history.component.scss']
})
export class MedicHistoryComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  lodash: any = _;

  title = 'Historial Consultas Médicas';
  doctor = 'Dr. Felipe Acuña';
  licence = 'M.N. ABS123';

  private loadingErrorConsultationsMessage = 'Vuelva en unos minutos';
  private loadingErrorConsultationsTitle = 'No hay pacientes en espera';

  displayedColumns: TableColumns[] = [
    {name: 'Nombre y apellido afiliado',key: 'patient_name'},
    {name: 'Número de afiliado',key: 'patient_id'},
    {name: 'Plan', key: 'patient_plan'},
    {name: 'Fecha', key: 'date'},
    {name: 'Acciones', key: 'actions', isAction: true,
      actions: [{
        name: 'Ver info',
        icon: 'visibility'
      }]
    }
  ];
  columnsList: string[];
  dataSource: any;
  displayedData: any[];
  private unpaginatedData: any[];
  private filteredData: any[];
  configPagination = {
    totalRecords: 12,
    page: 0,
    size: 10
  };
  filtersData = [
    new ABMGenericFormField({ name: 'patient_name', value: '', title: 'Nombre y apellido afiliado', type: 'text', size: 'span-3' }),
    new ABMGenericFormField({ name: 'date_begin', value: '', title: 'Fecha desde', type: 'date', size: 'span-2' }),
    new ABMGenericFormField({ name: 'date_end', value: '', title: 'Fecha hasta', type: 'date', size: 'span-2' }),
    new ABMGenericFormField({ name: 'submit', value: '', title: 'Buscar', type: 'submit', size: 'span-1' }),
  ];

  updatedData(displayedData: any[]) {
    this.unpaginatedData = this.filteredData = displayedData;
    this.configPagination.totalRecords = this.filteredData.length;
    this.paginate(this.configPagination.size, this.configPagination.page);
    this.dataSource.sort = this.sort;
  }

  constructor(private _consultationsService: ConsultationService,
              private _toastr: ToastrService,
              private _router: Router,
              private _session: SessionService) { }

  ngOnInit() {
    this.columnsList = _.map(this.displayedColumns, (col) => col.key);
    const user = this._session.getUserFromSession();
    this.doctor = 'Dr. '+user.first_name+' '+user.last_name;
    this.licence = 'M.N. '+user.licence;
    this._consultationsService.getAllConsultationsByDoctorUsingGET({doctorId: user.id})
      .subscribe(data => {
          this.updatedData(_.map(data, (history) => {
            return {
              patient_name: history.patient_first_name+' '+history.patient_last_name,
              ...history
            }}))
        },
        err => {
          this.updatedData([]);
        });
  }

  onClickAction($event: MouseEvent, action: any, element: any) {
    const data = {
      affiliate_first_name: element.patient_name.split(' ')[0],
      affiliate_last_name: element.patient_name.split(' ')[1],
      affiliate_plan: element.patient_plan,
      affiliate_id: element.patient_dni,
      read_only: 'fjsa-231f-dcvi-432'
    };
    this._router.navigate([`/medico/consultas/${element.consultation_id}/receta-indicaciones`, data]);
  }

  changePage($event: PageEvent) {
    this.configPagination.page = $event.pageIndex;
    this.paginate(this.configPagination.size, this.configPagination.page);
  }

  private paginate(page_size, page_number) {
    this.displayedData = this.filteredData.slice(page_number * page_size, (page_number+1) * page_size);
    this.dataSource = new MatTableDataSource(this.displayedData);
  }

  search(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
    const filters = callObject.values;
    const dateFormat = 'YYYY-MM-DD';
    this.filteredData = this.unpaginatedData;
    if(filters.patient_name != '') {
      this.filteredData = _.filter(this.filteredData, (data) => data.patient_name.includes(filters.patient_name));
    }
    if(filters.date_begin){
      this.filteredData = _.filter(this.filteredData, (data) => moment(filters.date_begin).format(dateFormat) <= moment(this.changeDateFormat(data.date)).format(dateFormat));
    }
    if(filters.date_end){
      this.filteredData = _.filter(this.filteredData, (data) =>  moment(filters.date_end).format(dateFormat) >= moment(this.changeDateFormat(data.date)).format(dateFormat));
    }
    this.paginate(this.configPagination.size, this.configPagination.page);
    this.configPagination.totalRecords = this.filteredData.length;
    callObject.onSubmitCallback({});
  }

  getConsultation() {
    const user = this._session.getUserFromSession();
    this._consultationsService.getConsultationGET({doctor: user.id})
      .subscribe(data => {
          this._router.navigate([`/medico/consultas/${data.consultation_id}/receta-indicaciones`,data]);
        },
        err => {
          console.error(err);
          this._toastr.info(this.loadingErrorConsultationsMessage,this.loadingErrorConsultationsTitle);
        });
  }

  private changeDateFormat(date: string) {
    const dateParts = date.substring(0, 10).split("-");
    const ddMMYYYYDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return ddMMYYYYDate;
  }
}
