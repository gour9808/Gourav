import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListEditComponent } from './vehicle-list-edit.component';

describe('VehicleListEditComponent', () => {
  let component: VehicleListEditComponent;
  let fixture: ComponentFixture<VehicleListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
