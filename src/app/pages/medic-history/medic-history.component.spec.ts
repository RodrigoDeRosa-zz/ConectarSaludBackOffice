import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicHistoryComponent } from './medic-history.component';

describe('MedicHistoryComponent', () => {
  let component: MedicHistoryComponent;
  let fixture: ComponentFixture<MedicHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
