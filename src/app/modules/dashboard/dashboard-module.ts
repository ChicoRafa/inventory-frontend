import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Dashboard } from './pages/dashboard';
import { RouterModule } from '@angular/router';
import { S } from '@angular/cdk/keycodes';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    Dashboard,
    Home
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class DashboardModule { }
