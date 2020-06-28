import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import * as moment from 'moment/moment';

import { ABMGenericFormField } from '../../models/generic-form-field';

const dateFormat = 'YYYY-MM-DD';

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return moment(date).format(dateFormat);
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

//idea: https://stackblitz.com/edit/angular-5-generic-form-component?file=app%2Fgeneric-form.component.ts
@Component({
  selector: 'generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

/**
 * Clase que maneja el comportamiento del formulario basico
 */
export class ABMGenericFormComponent implements OnInit {


  // form fields
  _fields: Array<ABMGenericFormField> = [];
  get fields(): Array<ABMGenericFormField> {
    return this._fields;
  }

  @Input('fields')
  set fields(fields: Array<ABMGenericFormField>) {
    this.initForm(fields);
    this._fields = fields ? fields : [];
  }

  // values form fields
  @Input('values') values: any;

  _initValues: any;
  @Input('initValues')
  set initValues(values: any) {
    this.initForm(this.fields, values)
    this._initValues = values;
  }

  get initValues(): any {
    return this._initValues;
  }


  // double-binding indicating form is valid
  @Input() isValid: boolean;
  @Output() isValidChange = new EventEmitter<boolean>();
  // fires when some field changes
  @Output() onChange = new EventEmitter<any>();

  // input that indicates button is loading
  @Input('loading') loading: boolean = false;

  // event that fires when submit form
  @Output() onSubmit = new EventEmitter<any>();

  // event that fires to click delete button
  @Output() onDelete = new EventEmitter<any>();

  /* From */
  genericForm: FormGroup;

  constructor(private fb: FormBuilder, private elRef: ElementRef) { }

  ngOnInit() {
    this.initForm(this.fields);
  }


  /**
   * Emit an onSubmit event
   */
  submit(event) {
    this.loading = true;
    let val = {
      values: this.getFormValues(),
      onSubmitCallback: this.onSubmitCallback,
    }
    this.onSubmit.emit(val);
  }


  /**
   * Emit an onDelete event
   */
  delete(event) {
    this.loading = true;
    let val = {
      values: this.getFormValues(),
      onSubmitCallback: this.onSubmitCallback,
    }
    this.onDelete.emit(val);
  }
  /**
   * Callback function that is called when the parent component get an api answer
   */
  onSubmitCallback = (res) => {
    this.loading = false;
    if (res.success) {
      this.resetForm();
    }
  }

  onFocusOut(event) {
    const field = this.fields.find(field => field.name == event.target.id)
    if (field && field.onFocusOut) {
      field.onFocusOut(this.getFormValues())
    }
  }

  /**
   * Form initialization
   * @param fields Form array fields
   * @param value Form initial values
   */
  initForm(fields: ABMGenericFormField[], values = {}) {
    let group: any = {};

    fields.forEach(field => {

      if (field.type == "button" || field.type == "submit") {
        return;
      }

      let value: any;

      value = values && typeof values[field.name] != "undefined" ? values[field.name] : field.value;
      group[field.name] = new FormControl({ value: value || '', disabled: field.disabled || false }, field.validators)

      if (field.onChange) {
        group[field.name].valueChanges.subscribe(val => field.onChange(val, this.getFormValues()))
      }

      field.formControl = group[field.name];

    });
    this.genericForm = new FormGroup(group);

  }
  /**
   * Get all values from formGroups and the fields there isn't inside the form
   * @returns Objeto con los valores del formulario.
   */
  getFormValues() {
    let values = {};
    this.fields.forEach(element => {

      if (element.type == "button" || element.type == "submit") {
        return;
      }

      let fieldValue = this.genericForm.get(element.name).value;
      values[element.name] = fieldValue;
    });
    return values;
  }



  /** Clean the form and the controls. It adds validations when the field is not generic */
  resetForm() {
    let control;
    this.genericForm.markAsUntouched();
    this.genericForm.setErrors({ 'invalid': true });

    this.fields.forEach(element => {

      if (element.type == "button" || element.type == "submit") {
        return;
      }

      this.genericForm.get(element.name).setErrors(null);

    });
    this.genericForm.reset();

  }


  dynamicFormChange($event: any) {
    this.genericForm = $event;

  }
}
