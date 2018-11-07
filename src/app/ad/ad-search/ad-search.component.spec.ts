import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSearchComponent } from './ad-search.component';

describe('AdSearchComponent', () => {
  let component: AdSearchComponent;
  let fixture: ComponentFixture<AdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
