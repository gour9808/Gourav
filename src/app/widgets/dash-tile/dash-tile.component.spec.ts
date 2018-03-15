import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTileComponent } from './dash-tile.component';

describe('DashTileComponent', () => {
  let component: DashTileComponent;
  let fixture: ComponentFixture<DashTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
