import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PescriptionAndIndicationComponent } from './pescription-and-indication.component';

describe('PescriptionAndIndicationComponent', () => {
  let component: PescriptionAndIndicationComponent;
  let fixture: ComponentFixture<PescriptionAndIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PescriptionAndIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PescriptionAndIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
