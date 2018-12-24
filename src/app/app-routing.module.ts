import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './header/log-in/log-in.component';
import { RegisterComponent } from './header/register/register.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { HomeComponent } from './home/home/home.component';
import { MyDashboardComponent } from './header/my-dashboard/my-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'log-in', component: LogInComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'my-dashboard', component: MyDashboardComponent},
  { path: 'ad-list', loadChildren: './ad/ad.module#AdModule'},
  { path: 'article-list', loadChildren: './article/article.module#ArticleModule'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
