import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneVehicleDialogComponent } from './clone-vehicle-dialog.component';

describe('CloneVehicleDialogComponent', () => {
  let component: CloneVehicleDialogComponent;
  let fixture: ComponentFixture<CloneVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
