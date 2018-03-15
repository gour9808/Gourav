import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldMultipleComponent } from './input-field-multiple.component';

describe('InputFieldMultipleComponent', () => {
  let component: InputFieldMultipleComponent;
  let fixture: ComponentFixture<InputFieldMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
