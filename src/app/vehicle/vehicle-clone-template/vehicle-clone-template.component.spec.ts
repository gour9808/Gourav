import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCloneTemplateComponent } from './vehicle-clone-template.component';

describe('VehicleCloneTemplateComponent', () => {
  let component: VehicleCloneTemplateComponent;
  let fixture: ComponentFixture<VehicleCloneTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCloneTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCloneTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
