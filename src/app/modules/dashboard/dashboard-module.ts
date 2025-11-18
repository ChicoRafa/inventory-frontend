import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Dashboard } from './pages/dashboard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { CategoryModule } from '../category/category-module';



@NgModule({
  declarations: [
    Dashboard,
    Home
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoryModule
  ]
})
export class DashboardModule { }
