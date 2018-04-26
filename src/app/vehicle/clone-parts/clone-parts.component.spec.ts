import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonePartsComponent } from './clone-parts.component';

describe('ClonePartsComponent', () => {
  let component: ClonePartsComponent;
  let fixture: ComponentFixture<ClonePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClonePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClonePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
