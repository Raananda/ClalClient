import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { DisplayDataComponent } from './main-view/pages/display-data/display-data.component';
import { FormComponent } from './main-view/pages/form/form.component';
import { HomeComponent } from './main-view/pages/home/home.component';
import { SearchDataComponent } from './main-view/pages/search-data/search-data.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/main-view/home', pathMatch: 'full' },
  { path: 'main-view', redirectTo: '/main-view/home', pathMatch: 'full' },

  {
    path: 'main-view',
    component: MainViewComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchDataComponent },
      { path: 'display', component: DisplayDataComponent },
      { path: 'form', component: FormComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
