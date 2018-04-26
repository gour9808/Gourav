import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldAutocompleteAddressComponent } from './input-field-autocomplete-address.component';

describe('InputFieldAutocompleteAddressComponent', () => {
  let component: InputFieldAutocompleteAddressComponent;
  let fixture: ComponentFixture<InputFieldAutocompleteAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldAutocompleteAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldAutocompleteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
