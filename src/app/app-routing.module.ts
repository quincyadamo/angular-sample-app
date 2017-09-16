import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { ListComponent } from './list/list.component'
import { EditComponent } from './list/edit/edit.component'
import { NewComponent } from './list/new/new.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'products', pathMatch: 'full', component: ListComponent},
  {path: 'products/edit/:id', pathMatch: 'full', component: EditComponent},
  {path: 'products/new', pathMatch: 'full', component: NewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }