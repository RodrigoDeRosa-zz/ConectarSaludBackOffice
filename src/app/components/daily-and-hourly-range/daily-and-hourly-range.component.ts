import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-daily-and-hourly-range',
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

  seedData = [
    { day: 'LUNES', fromTime: '10:00', toTime: '17:00' },
    { day: 'MARTES', fromTime: '10:00', toTime: '17:00' },
    { day: 'MIERCOLES', fromTime: '10:00', toTime: '17:00' },
  ];

  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      ranges: this.fb.array([])
    });

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
      day: [],
      fromTime: [],
      toTime: [],
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
    console.log(this.dynamicForm.value);
  }

  save() {
    console.log(this.dynamicForm.value);
  }

  get rangesFormArray() {
    return (<FormArray>this.dynamicForm.get('ranges'));
  }

}
