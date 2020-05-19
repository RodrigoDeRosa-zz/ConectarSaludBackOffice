import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicConsultationsComponent } from './medic-consultations.component';

describe('MedicConsultationsComponent', () => {
  let component: MedicConsultationsComponent;
  let fixture: ComponentFixture<MedicConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
