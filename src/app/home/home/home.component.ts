import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
