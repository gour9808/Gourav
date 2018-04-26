import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneDealerComponent } from './clone-dealer.component';

describe('CloneDealerComponent', () => {
  let component: CloneDealerComponent;
  let fixture: ComponentFixture<CloneDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
