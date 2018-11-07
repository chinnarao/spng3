import { ArticleListComponent } from './article-list/article-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDeleteComponent } from './article-delete/article-delete.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';
import { ArticleReadComponent } from './article-read/article-read.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'create', component: ArticleCreateComponent },
  { path: 'update/:id', component: ArticleUpdateComponent },
  { path: ':id', redirectTo: 'read/:id', pathMatch: 'full'},
  { path: 'read/:id', component: ArticleReadComponent },
  { path: 'delete/:id', component: ArticleDeleteComponent },
  { path: 'article-list', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ArticleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
