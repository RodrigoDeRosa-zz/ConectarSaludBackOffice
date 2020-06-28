import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {TableColumns} from '../../models/table-columns';

import * as _ from 'lodash';
import {PageEvent} from "@angular/material/paginator";
import {ABMGenericFormField} from "../../models/generic-form-field";
import {Validators} from "@angular/forms";

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

  displayedColumns: TableColumns[] = [
    {name: 'Nombre y apellido',key: 'position'},
    {name: 'Número de afiliado',key: 'name'},
    {name: 'Email', key: 'weight'},
    {name: 'Fecha', key: 'symbol'},
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
  configPagination = {
    totalRecords: 12,
    page: 0,
    size: 10
  };
  filtersData = [
    new ABMGenericFormField({ name: 'name_and_lastname', value: '', title: 'Nombre y apellido afiliado', type: 'text', size: 'span-3' }),
    new ABMGenericFormField({ name: 'date_begin', value: '', title: 'Fecha desde', type: 'date', size: 'span-2' }),
    new ABMGenericFormField({ name: 'date_end', value: '', title: 'Fecha hasta', type: 'date', size: 'span-2' }),
    new ABMGenericFormField({ name: 'submit', value: '', title: 'Buscar', type: 'submit', size: 'span-1' }),
  ];

  updatedData(displayedData: any[]) {
    this.unpaginatedData = displayedData;
    this.configPagination.totalRecords = this.unpaginatedData.length;
    this.paginate(this.configPagination.size, this.configPagination.page);
    this.dataSource.sort = this.sort;
  }

  constructor() { }

  ngOnInit() {
    this.columnsList = _.map(this.displayedColumns, (col) => col.key);
    this.updatedData([
      {position: 'Francis Perro', name: '123.312', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
      {position: 'Maria Canasta', name: '142.212', weight: 'fperro@email.com', symbol: '05-06-2020'},
    ]);
  }

  onClickAction($event: MouseEvent, action: any, element: any) {
    window.alert(JSON.stringify(element));
  }

  changePage($event: PageEvent) {
    this.configPagination.page = $event.pageIndex;
    this.paginate(this.configPagination.size, this.configPagination.page);
  }

  private paginate(page_size, page_number) {
    this.displayedData = this.unpaginatedData.slice(page_number * page_size, (page_number+1) * page_size);
    this.dataSource = new MatTableDataSource(this.displayedData);
  }

  search(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
    window.alert(JSON.stringify(callObject.values));
    callObject.onSubmitCallback({});
  }
}
