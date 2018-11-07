import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MdcModule } from '../_core/mdc-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../_core/material-module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MdcModule,
    MaterialModule,
  ]
})
export class HomeModule { }
