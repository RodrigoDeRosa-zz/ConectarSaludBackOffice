import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABMGenericFormComponent } from './generic-form.component';

describe('GenericFormComponent', () => {
  let component: ABMGenericFormComponent;
  let fixture: ComponentFixture<ABMGenericFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABMGenericFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABMGenericFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
