import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdcModule } from "../_core/mdc-module";
import { MaterialModule } from "../_core/material-module";
const COMPONENTS = [NotFoundComponent, FooterComponent];
const MODULES = [
  CommonModule,
  PagesRoutingModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  MdcModule,
  MaterialModule
];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [MODULES]
})
export class PagesModule {}
