import { Component, OnDestroy, ViewChild  } from '@angular/core';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';
// import {Subscription} from 'rxjs/Subscription';
import { NGXLogger } from 'ngx-logger';
// import { MenuService } from './menu/menu.service';
import { HttpHeaders } from '@angular/common/http';
import { HeaderRouteHelperService } from './header/header-route-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  constructor(media: ObservableMedia, private logger: NGXLogger, headerRouteHelperService: HeaderRouteHelperService) {
    this.logger.setCustomHttpHeaders(new HttpHeaders({'Content-Type': 'text/plain'}));
    headerRouteHelperService.loadRouting();
  }

  loadMobileContent() { /* .... */ }

  ngOnDestroy() {
    // this.watcher.unsubscribe();
  }
}
