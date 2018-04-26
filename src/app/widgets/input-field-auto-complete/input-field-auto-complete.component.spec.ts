import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldAutoCompleteComponent } from './input-field-auto-complete.component';

describe('InputFieldAutoCompleteComponent', () => {
  let component: InputFieldAutoCompleteComponent;
  let fixture: ComponentFixture<InputFieldAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
