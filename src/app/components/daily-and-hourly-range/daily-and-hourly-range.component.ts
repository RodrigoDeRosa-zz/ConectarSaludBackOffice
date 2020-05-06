import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'daily-and-hourly-range',
  templateUrl: './daily-and-hourly-range.component.html',
  styleUrls: ['./daily-and-hourly-range.component.css']
})
export class DailyAndHourlyRangeComponent implements OnInit {

  days = [
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ];

  times = _.flatMap([...Array(23).keys()], (hour) => {
    const h = hour < 10? '0'+hour:hour;
    return [h+':00',h+':30']
  });

  seedData = [];

  @Input() id: string;
  @Input() title: string;

  @Input() dynamicForm: FormGroup;
  @Output() dynamicFormChange: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization() {
    this.dynamicForm.setControl(this.id, this.fb.array([], Validators.required));

    // Uncomment the line below If you want to seed the Form with some data
    this.seedRangesFormArray();
  }

  seedRangesFormArray() {
    this.seedData.forEach(seedDatum => {
      const formGroup = this.createFilterGroup();
      formGroup.patchValue(seedDatum);
      this.rangesFormArray.push(formGroup);
    });
  }

  createFilterGroup() {
    return this.fb.group({
      day: ['LUNES'],
      from_time: ['09:00'],
      to_time: ['17:00'],
    });
  }

  addFilterToRangesFormArray() {
    this.rangesFormArray.push(this.createFilterGroup());
  }

  removeFilterFromRangesFormArray(index) {
    this.rangesFormArray.removeAt(index);
  }

  // when select a filter -> adds an input value
  /*selectedAPIChanged(i) {
    this.getFilterGroupAtIndex(i).addControl('value', this.getFormControl());
  }

  getFormControl() {
    return this.fb.control(null);
  }

  getFilterGroupAtIndex(index) {
    return (<FormGroup>this.rangesFormArray.at(index));
  }
  */

  selected(){
    this.dynamicForm.valueChanges.subscribe(value=>{
      this.dynamicFormChange.emit(this.dynamicForm);
    })
  }

  get rangesFormArray() {
    return (<FormArray>this.dynamicForm.get(this.id));
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = _.get(changes,'dynamicForm.currentValue.controls.availability_times.value');
    if(value){
      this.seedData = value;
      this.formInitialization();
    }
  }

}
