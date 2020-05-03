import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAndHourlyRangeComponent } from './daily-and-hourly-range.component';

describe('DailyAndHourlyRangeComponent', () => {
  let component: DailyAndHourlyRangeComponent;
  let fixture: ComponentFixture<DailyAndHourlyRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyAndHourlyRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAndHourlyRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
