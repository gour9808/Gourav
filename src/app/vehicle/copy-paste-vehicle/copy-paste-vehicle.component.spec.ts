import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPasteVehicleComponent } from './copy-paste-vehicle.component';

describe('CopyPasteVehicleComponent', () => {
  let component: CopyPasteVehicleComponent;
  let fixture: ComponentFixture<CopyPasteVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyPasteVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPasteVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
