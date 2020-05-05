import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { FormTab } from '../../models/form-tab';
import * as _ from 'lodash';
import { ABMGenericFormComponent } from '../generic-form/generic-form.component';


@Component({
	selector: 'generic-abm',
	templateUrl: './generic-abm.component.html',
	styleUrls: ['./generic-abm.component.css']
})
export class ABMGenericAbmComponent implements OnInit {
	/*
	 * Form title and subtitle
	 */
	@Input() title: string = 'Alta General';
	@Input() subtitle: string = 'Módulo de prueba para dar de alta una entidad de un sistema';

	/**
	* List tab configuration
	*/
	@Input() listTab: FormTab = new FormTab("list");


	/**
	 * Create tab configuration
	 */
	@Input() createTab: FormTab = new FormTab("form");

	/**
	* Edit tab configuration
	*/
	@Input() editTab: FormTab = new FormTab("form");

	/**
	 * Forms and methods reference
	 */
	@ViewChildren(ABMGenericFormComponent) forms: QueryList<ABMGenericFormComponent>
	createForm: ABMGenericFormComponent;
	editForm: ABMGenericFormComponent;

	createValues: any;
	/**
	 * Active tab
	 */
	selected = new FormControl(0);
	/**
	 * From extracted values
	 * We would have to reset it in every form tab transition
	 */
	values: any;

	constructor(private _toastr: ToastrService) { }

	ngOnInit() {
		this.listTab.title = this.listTab.title ? this.listTab.title : "Listar";
		this.createTab.title = this.createTab.title ? this.createTab.title : "Crear";
		this.editTab.title = this.editTab.title ? this.editTab.title : "Editar";

		// inicializo con el mismo formulario que con el de creacion
		if (!this.editTab) {
			//usar _cloneDeep para evitar problemas de referencia cuando se copia.
			this.editTab = _.cloneDeep(this.createTab);
			this.editTab.title = "Editar"
		}

		// inserto el boton de editar en las columnas
		this.listTab.contentList.columns.push({
			name: 'Acciones',
			key: 'action',
			isAction: true,
			actions: [
				{
					name: 'Editar',
					icon: 'edit',
					execute: this.toEdit.bind(this)
				}
			]
		});

		// buttons creation
		this.createTab.contentForm.data.push({ name: 'cancel', title: 'Cancelar', type: 'button', execute: this.cancelCreate, size: 'span-1', offsetLeft: 'span-10' });
		this.createTab.contentForm.data.push({ name: 'submit', title: 'Guardar', type: 'submit', size: 'span-1' });

		let offet = "span-10";
		if (this.editTab.contentForm.formConfiguration.onDelete) {
			offet = "span-9";
			this.editTab.contentForm.data.push({ name: 'cancel', title: 'Eliminar', type: 'delete', execute: this.deleteEdit, size: 'span-1', color: "warn" });
		}

		this.editTab.contentForm.data.push({ name: 'cancel', title: 'Cancelar', type: 'button', execute: this.cancelEdit, size: 'span-1', offsetLeft: offet });
		this.editTab.contentForm.data.push({ name: 'submit', title: 'Guardar', type: 'submit', size: 'span-1' });

	}

	/** Set forms */
	ngAfterViewInit() {
		this.createForm = this.forms.toArray()[0];
		this.editForm = this.forms.toArray()[1];
	}

	/**
	 * Update the form values
	 */
	updateValues(values) {
		this.values = values;
	}
	/**
	 * Creation submit
	 */
	save(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
		/* Se define Callback en respuesta al submit del create */
		this.createTab.contentForm.formConfiguration.onSubmit(callObject.values, (res) => {
			callObject.onSubmitCallback(res);
			if (res.success) {
        this._toastr.success(res.success.message, "Operación exitosa");
				this.goToList();
			}
			this.handleError(res);
		})
	}


	/**
	 * Edition submit
	 */
	edit(callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) {
		/* Se define Callback en respuesta al submit del create */
		this.editTab.contentForm.formConfiguration.onSubmit(callObject.values, (res) => {
			callObject.onSubmitCallback(res);
			if (res.success) {
        this._toastr.success(res.success.message, "Operación exitosa");
				this.goToList();
			}
			this.handleError(res);
		})
	}

	private handleError(res){
    if(res.error) {
      console.error(res);
      this._toastr.error(res.error.message,res.error.title)
    }
  }

	deleteEdit = (callObject: { values: any, onSubmitCallback: Function } = { values: {}, onSubmitCallback: (res) => { console.warn("onSubmitCallback not defined") } }) => {
		/* Se define Callback en respuesta al delete del edit */
		this.editTab.contentForm.formConfiguration.onDelete(callObject.values, (res) => {
			callObject.onSubmitCallback(res);
			if (res.success) {
				this.goToList();
			}
		})
	}



	/** Clean forms */
	cleanForms() {
		this.createForm.resetForm();
		this.editForm.resetForm();
	}


	/**
		 * Cancel forms
		 */
	cancelCreate = () => {
		this.createForm.resetForm();
		this.goToList();
	}

	/**
  * Cancel edit form
  */
	cancelEdit = () => {
		this.editForm.resetForm();
		this.goToList();
	}
	protected goToList() {
		this.selected.setValue(0);
		this.values = {};  // reset valores
	}


	toEdit(row) {
		this.selected.setValue(2);
		this.setEditValues(row);
	}

	/**  Set initial values of form edit */
	setEditValues(selectedRow) {
		this.editTab.contentForm.initValues = selectedRow;
		//Metodo para forzar el update del input.
		this.editTab.contentForm.initValues = Object.assign({}, this.editTab.contentForm.initValues);
	}

	/** It fires when there is a tab change event */
	clickOnTab(event) {
		this.selected.setValue(event);

		//No queremos que se limpien los campos cuando se va al editTab
		if (event != 2) {
			this.cleanForms();
		}
	}

}
