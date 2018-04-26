import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonePartDialogComponent } from './clone-part-dialog.component';

describe('ClonePartDialogComponent', () => {
  let component: ClonePartDialogComponent;
  let fixture: ComponentFixture<ClonePartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClonePartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClonePartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
