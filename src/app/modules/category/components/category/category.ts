import { Component, inject, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../shared/services/categoryService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  private categoryService = inject(CategoryService);

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  // Signal that automatically updates with data from the service
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });

  constructor() {
    // Effect para logging cuando cambia el signal
    effect(() => {
      const data = this.categories();
      // console.log('Categories:', data);
      // Only process if there is real data (not the empty initialValue)
      if (data && Object.keys(data).length > 0) {
        this.processCategoriesResponse(data);
      }
    });
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
    
    if(resp.metadata && resp.metadata[0] && resp.metadata[0].code == "00"){
      let categoryList = resp.categoryResponse.category;
      categoryList.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }
}


export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}