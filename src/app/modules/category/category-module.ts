import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './components/category/category';
import { CategoryDialog } from './components/category-dialog/category-dialog';
import { MaterialModule } from '../shared/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Category,
    CategoryDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
