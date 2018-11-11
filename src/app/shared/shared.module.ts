import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilsService } from "./helpers/utils.service";

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule, ReactiveFormsModule],
  declarations: [],
  exports: [],
  providers: [UtilsService]
})
export class SharedModule {}
