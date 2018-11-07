import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { UtilsService } from './helpers/utils.service';
import { MdcModule } from './modules/mdc.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdcModule
  ],
  declarations: [
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  exports: [
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  providers: [UtilsService],
})
export class SharedModule { }
