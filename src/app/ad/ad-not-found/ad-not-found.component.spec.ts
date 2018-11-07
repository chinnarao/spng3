import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNotFoundComponent } from './ad-not-found.component';

describe('AdNotFoundComponent', () => {
  let component: AdNotFoundComponent;
  let fixture: ComponentFixture<AdNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
