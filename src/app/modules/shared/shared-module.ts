import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidenav } from './components/sidenav/sidenav';
import { ConfirmAction } from './components/confirm-action/confirm-action';
import { MaterialModule } from './material-module';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    Sidenav,
    ConfirmAction
  ],
  exports: [
    Sidenav
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
