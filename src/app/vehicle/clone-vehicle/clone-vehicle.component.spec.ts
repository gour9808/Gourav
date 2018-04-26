import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneVehicleComponent } from './clone-vehicle.component';

describe('CloneVehicleComponent', () => {
  let component: CloneVehicleComponent;
  let fixture: ComponentFixture<CloneVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
