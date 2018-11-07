import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearchCriteriaComponent } from './article-search-criteria.component';

describe('ArticleSearchCriteriaComponent', () => {
  let component: ArticleSearchCriteriaComponent;
  let fixture: ComponentFixture<ArticleSearchCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSearchCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
