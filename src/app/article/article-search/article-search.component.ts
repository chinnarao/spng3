import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit {

  constructor(private logger: NGXLogger) {}

  showSearchBarMenu = false;

  ngOnInit() {
  }

  showSearchBarClick(): void {
    this.showSearchBarMenu = !this.showSearchBarMenu;
  }

  search(): void {
    // some event emitter.
  }

}
