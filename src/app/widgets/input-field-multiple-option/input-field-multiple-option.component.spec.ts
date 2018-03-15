import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldMultipleOptionComponent } from './input-field-multiple-option.component';

describe('InputFieldMultipleOptionComponent', () => {
  let component: InputFieldMultipleOptionComponent;
  let fixture: ComponentFixture<InputFieldMultipleOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldMultipleOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldMultipleOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
