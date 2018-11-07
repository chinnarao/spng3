import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDeleteComponent } from './ad-delete.component';

describe('AdDeleteComponent', () => {
  let component: AdDeleteComponent;
  let fixture: ComponentFixture<AdDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
