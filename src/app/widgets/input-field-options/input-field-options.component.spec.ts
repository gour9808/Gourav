import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldOptionsComponent } from './input-field-options.component';

describe('InputFieldOptionsComponent', () => {
  let component: InputFieldOptionsComponent;
  let fixture: ComponentFixture<InputFieldOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
