import { ValidatorFn, AbstractControlOptions, FormControl } from '@angular/forms';

/**
 * Clase con la propiedades de un campo generico, que trata de cubrir todas las necesidades posibles de un campo de un form.
 */
export class ABMGenericFormField {

  /** Campo que se usa como label */
  title: string; //label

  name: string; //correspondiente al identificador y al fiel de los values
  type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea' | 'date' | 'submit' | 'button' | 'delete';

  /**
   *Setters and getters para configurar las maneras de obtener los value de los diferentes tipos de campos
   */
  _value?: any;
  get value(): any {
    //Obtencion del value dependiendo el tipo de campo.
    switch (this.type) {

      default:
        return this.formControl ? this.formControl.value : this._value;
    }


  }
  set value(val) {
    //Diferentes formas de setear los valores;
    switch (this.type) {

      default:
        this._value = val;
        if (this.formControl) {
          this.formControl.setValue(val);
        }
        break;
    }
  }

  offsetLeft?: string;
  size?: string; //span-6: tamaño de grilla en material
  offsetRight?: string;
  placeholder?: string;
  hidden?: boolean; //si el campo aparece oculto o no

  /**
   * Parametro que indica si el campo esta desabilitado, usado en la creacion del FormControl.
   */
  disabled?: boolean; //si el campo esta deshabilitado

  /** validator o ValidatorFn[] propias del campo, unicamente para campos aceptados por el FormGroup */
  validators?: ValidatorFn | AbstractControlOptions | ValidatorFn[];

  /** Array con las opciones del select, con formato*/
  lookups?: Array<Lookup> = [];//fuer type == select

  checked?: boolean;  //type == checkbox
  required?: boolean; //type == checkbox

  mask?: Array<any>; //type == input

  apiSearch?: Function; //type == autocomplete -> llamada a servicio que popula
  getFormattedResult?: Function; //type == autocomplete -> llamada a servicio que renderea el resultado

  color?: string; //type == submit

  /**
   * Referencia al form control que usa este field.
   */
  formControl?: FormControl;
  /**
   * Configuracion del drag and drop.
   */
  dragConf?: DragConfiguracion;

  /*
  Definicion de metodos.
  */

  /**
   * Metodo que se ejecuta en el click (en el caso del button), pero podria llegar a implementarse en otros tipos de campos.
   */
  execute?: any;

  /**
   * Metodo que se ejecuta en focus out de algun field.
   */
  onFocusOut?: Function;

  /** metodo que se ejecuta en on Change, recibe el valor del field y el valor del form. */
  onChange?: Function;

  constructor(option: {
    title: string,
    name: string,
    type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea' | 'date' | 'submit' | 'button',
    value: any,
    offsetLeft?: string,
    size?: string, //span-6: tamaño de grilla en material
    offsetRight?: string,
    hidden?: boolean, //si el campo aparece oculto o no
    disabled?: boolean, //si el campo esta deshabilitado
    validators?: Array<ValidatorFn>,
    lookups?: Array<Lookup>,//fuer type == select
    execute?: any,
    placeholder?,
    checked?: boolean,  //type == checkbox
    required?: boolean, //type == checkbox
    mask?: any, //type == input
    apiSearch?: Function, //type == autocomplete -> llamada a servicio que popula
    getFormattedResult?: Function, //type == autocomplete -> llamada a servicio que renderea el resultado
    color?: string, //type == submit
    dragConf?: DragConfiguracion,
    onFocusOut?: Function;
    onChange?: Function;


  }) {
    this.title = option.title;
    this.name = option.name;
    this.type = option.type;
    this.offsetLeft = option.offsetLeft;
    this.size = option.size;
    this.offsetRight = option.offsetLeft;
    this.hidden = option.hidden;
    this.disabled = option.disabled;
    this.validators = option.validators;
    this.lookups = option.lookups ? option.lookups : [];
    this.execute = option.execute;
    this.checked = option.checked;
    this.required = option.required;
    this.mask = option.mask ? option.mask : false;
    this.apiSearch = option.apiSearch;
    this.color = option.color;
    this.placeholder = option.placeholder;
    this.onFocusOut = option.onFocusOut;
    this.onChange = option.onChange;
    this.value = option.value;


  }

}

export class Lookup {
  key: string;
  value: string;
  selected?: boolean;
}

/**
 * Clase con la propiedades de configuracion del DragAndDrop.
 */
export class DragConfiguracion {

  /**
   * Label que se muestra sobre el box de opciones disponibles.
   */
  allLabel: string;

  /**
   * Label que se muestra sobre el box de opciones seleccionadas.
   */
  selectedLabel: string;

  /**
   * Todas las opciones menos las selecionadas
   */
  allAvaibleOptions: Array<{ key: string, value: string, disabled?: boolean }> = [];

  /**
   * Todas las opciones posibles
   */
  allOptions: Array<{ key: string, value: string, disabled?: boolean }> = [];

  /**
   * Todas las opciones seleccionadas
   */
  selectedOptions: Array<{ key: string, value: string, disabled?: boolean }> = [];

  /**
   * Metodo que configura las opciones disponibles en base a las que estan seleccionadas.
   */
  SetAllAvaiblesOptions = function () {
    this.allAvaibleOptions = this.allOptions.filter(
      option => !this.selectedOptions.filter(
        selectedOptions => option.key == selectedOptions.key
      ).length
    );
  }

  constructor(opt: { allLabel: string, selectedLabel: string, allOptions: Array<{ key: string, value: string, disabled?: boolean }>, selOptions: Array<{ key: string, value: string, disabled?: boolean }> }) {
    this.allLabel = opt.allLabel,
      this.selectedLabel = opt.selectedLabel,
      this.allOptions = opt.allOptions,
      this.selectedOptions = opt.selOptions,
      this.SetAllAvaiblesOptions();
  }


}
