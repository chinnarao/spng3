import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.scss']
})
export class AdSearchComponent implements OnInit {

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
