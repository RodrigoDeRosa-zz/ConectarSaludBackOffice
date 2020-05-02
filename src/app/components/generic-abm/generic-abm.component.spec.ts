import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMGenericAbmComponent } from './generic-abm.component';

describe('GenericAbmComponent', () => {
  let component: ABMGenericAbmComponent;
  let fixture: ComponentFixture<ABMGenericAbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABMGenericAbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABMGenericAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
