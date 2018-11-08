import { MdcModule } from './../_core/mdc-module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdRoutingModule} from './ad-routing.module';
import {AdCreateComponent} from './ad-create/ad-create.component';
import {AdReadComponent} from './ad-read/ad-read.component';
import {AdUpdateComponent} from './ad-update/ad-update.component';
import {AdDeleteComponent} from './ad-delete/ad-delete.component';
import {AdListComponent} from './ad-list/ad-list.component';
import {AdNotFoundComponent} from './ad-not-found/ad-not-found.component';
import { AdService } from './ad.service';
import { AdSearchComponent } from './ad-search/ad-search.component';
import { AdSearchCriteriaComponent } from './ad-search-criteria/ad-search-criteria.component';
import { MaterialModule } from '../_core/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdRoutingModule,
    FlexLayoutModule,
    MdcModule,
    MaterialModule,
  ],
  declarations: [AdCreateComponent, AdReadComponent, AdUpdateComponent, AdDeleteComponent, AdListComponent, AdNotFoundComponent, AdSearchComponent,
    AdSearchCriteriaComponent],
  providers: [AdService],
})
export class AdModule { }
