import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSearchCriteriaComponent } from './ad-search-criteria.component';

describe('AdSearchCriteriaComponent', () => {
  let component: AdSearchCriteriaComponent;
  let fixture: ComponentFixture<AdSearchCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSearchCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
