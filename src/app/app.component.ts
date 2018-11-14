import { Headers_Content_Type_Text } from 'src/app/_core/constants';
import { Component, OnDestroy, ViewChild } from "@angular/core";
import { ObservableMedia, MediaChange } from "@angular/flex-layout";
import { NGXLogger } from "ngx-logger";
import { HeaderRouteHelperService } from "./header/header-route-helper.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  constructor(
    media: ObservableMedia,
    private logger: NGXLogger,
    headerRouteHelperService: HeaderRouteHelperService
  ) {
    this.logger.setCustomHttpHeaders( Headers_Content_Type_Text);
    headerRouteHelperService.loadRouting();
  }

  loadMobileContent() {}

  ngOnDestroy() {}
}
