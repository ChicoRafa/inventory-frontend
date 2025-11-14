import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Dashboard } from './pages/dashboard';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Dashboard,
    Home
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
