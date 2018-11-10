import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AdSearchModel } from 'src/app/_models/ad.models';

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

  onToggleAdvancedSearchClick(param: string) {
    this.showSearchBarMenu = !this.showSearchBarMenu;
  }

  @Output() notifyOnUpdateSeachClick : EventEmitter<AdSearchModel> = new EventEmitter<AdSearchModel>();
  onUpdateSeachClick(param: AdSearchModel) {
    this.onToggleAdvancedSearchClick('');
    this.notifyOnUpdateSeachClick.emit(param);
  }

}
