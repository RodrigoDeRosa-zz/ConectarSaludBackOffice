import { TableColumns } from './table-columns';
import { ConfigPagination } from "./config-pagination"
import { EventEmitter } from "@angular/core";
import { ABMGenericFormField } from "./generic-form-field";
import { ABMGenericFormComponent } from '../components/generic-form/generic-form.component';

export class TabContent {

}

export class TabContentList extends TabContent {
  data: any[] = [];
  columns: TableColumns[] = [];
  pagination: ConfigPagination = new ConfigPagination();
  tableConfiguration: TableConfiguration = new TableConfiguration();
}


export class TableConfiguration {
  showFilters: boolean = false;
  onChangeFilter: Function = (event)=>console.warn("onChangeFilter is not defined");
  filterFields: ABMGenericFormField[];
  filterLoading: boolean;
  isRowClickeable: boolean = false;
  onSelectRow: Function = (event)=>console.warn("onSelectRow is not defined");
  onChangePage: Function = (event)=>console.warn("onChangePage is not defined");
  expandable: boolean = false;
  onExpandRow: Function = (event)=>console.warn("onExpandRow is not defined");
  rowClickeable: boolean = true;
  closeExpandible: boolean = false;
}

export class TabContentForm extends TabContent {
  data: any[] = [];
  initValues:any;
  disabled?:boolean;
  formConfiguration: FormConfiguration = new FormConfiguration();
  form?:ABMGenericFormComponent;
}


export class FormConfiguration {
  values: any;
  // double-binding que indica si el formulario es valido
  isValid: boolean;
  isValidChange = new EventEmitter<boolean>();
  // evento que se dispara al cambiar algun campo
  onChange = new EventEmitter<any>();

  // para el caso de los autocompletar donde necesitamos enviar para arriba lo que se recibe
  onSelectOption = new EventEmitter<any>();

  // entrada que indica que el botón se encuentra cargando
  loading: boolean = false;

  // evento que se dispara al submittear el formulario desde adentro
  onSubmit:Function;

  //evento que se dispara al borrar un registro.
  onDelete:Function;
}
