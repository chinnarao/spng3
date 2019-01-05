import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreateMapComponent } from './ad-create-map.component';

describe('AdCreateMapComponent', () => {
  let component: AdCreateMapComponent;
  let fixture: ComponentFixture<AdCreateMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCreateMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
