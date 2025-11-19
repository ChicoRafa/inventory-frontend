import { Component, inject, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../shared/services/categoryService';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { CategoryDialog, CategoryDialogResult } from '../category-dialog/category-dialog';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

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

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];

    if (resp.metadata && resp.metadata[0] && resp.metadata[0].code == '00') {
      let categoryList = resp.categoryResponse.category;
      categoryList.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog(element?: CategoryElement): void {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '500px',
      data: {
        id: element?.id,
        name: element?.name || '',
        description: element?.description || '',
      },
    });

    dialogRef.afterClosed().subscribe((result: CategoryDialogResult) => {
      if (result && result.success) {
        this.categoryService.saveCategory(result.data).subscribe({

          next: (response) => {
            this.openSnackBar('Category saved successfully', 'Success');
            this.processCategoriesResponse(this.categories());
          },

          error: (error) => {
            this.openSnackBar('Error saving category', 'Error');
          }
        });

      } else {
        this.openSnackBar('Category save cancelled', 'Cancelled');
      }
    });
  }
  
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 3000 });
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
