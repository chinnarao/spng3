import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdReadComponent } from './ad-read.component';

describe('AdReadComponent', () => {
  let component: AdReadComponent;
  let fixture: ComponentFixture<AdReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
