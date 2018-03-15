import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldNumberComponent } from './input-field-number.component';

describe('InputFieldNumberComponent', () => {
  let component: InputFieldNumberComponent;
  let fixture: ComponentFixture<InputFieldNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
