import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSearchDialogComponent } from './vehicle-search-dialog.component';

describe('VehicleSearchDialogComponent', () => {
  let component: VehicleSearchDialogComponent;
  let fixture: ComponentFixture<VehicleSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
