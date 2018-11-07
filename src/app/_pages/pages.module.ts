import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FlexLayoutModule,
  ]
})
export class PagesModule { }
