import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldBooleanComponent } from './input-field-boolean.component';

describe('InputFieldBooleanComponent', () => {
  let component: InputFieldBooleanComponent;
  let fixture: ComponentFixture<InputFieldBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
