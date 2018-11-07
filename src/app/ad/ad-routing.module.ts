import { AdNotFoundComponent } from './ad-not-found/ad-not-found.component';
import { AdDeleteComponent } from './ad-delete/ad-delete.component';
import { AdReadComponent } from './ad-read/ad-read.component';
import { AdUpdateComponent } from './ad-update/ad-update.component';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdListComponent },
  { path: 'create', component: AdCreateComponent },
  { path: 'update/:id', component: AdUpdateComponent },
  { path: ':id', redirectTo: 'read/:id', pathMatch: 'full'},
  { path: 'read/:id', component: AdReadComponent },
  { path: 'delete/:id', component: AdDeleteComponent },
  { path: 'ad-list', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: AdListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdRoutingModule { }
