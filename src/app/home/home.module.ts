import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { MdcModule } from "../_core/mdc-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../_core/material-module";

const IMPORTS = [
  CommonModule,
  HomeRoutingModule,
  FlexLayoutModule,
  MdcModule,
  MaterialModule
];
const DECLARATIONS = [HomeComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [IMPORTS]
})
export class HomeModule {}
