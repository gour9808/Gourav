import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePasteComponent } from './vehicle-paste.component';

describe('VehiclePasteComponent', () => {
  let component: VehiclePasteComponent;
  let fixture: ComponentFixture<VehiclePasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
