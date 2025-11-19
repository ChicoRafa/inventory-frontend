import { Component, inject, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../shared/services/categoryService';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { CategoryDialog, CategoryDialogResult } from '../category-dialog/category-dialog';
import { ConfirmAction } from '../../../shared/components/confirm-action/confirm-action';

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

  // Método para recargar las categorías desde el backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.processCategoriesResponse(data);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
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
      // Actualizar los datos en lugar de crear nuevo dataSource
      this.dataSource.data = dataCategory;
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
        if (result.data?.id) {
          this.categoryService.updateCategory(result.data.id, result.data).subscribe({
            next: (response) => {
              this.openSnackBar('Category updated successfully', 'Success');
              this.loadCategories(); // Recargar desde el backend
            },
            error: (error) => {
              this.openSnackBar('Error updating category', 'Error');
            },
          });
        } else {
          this.categoryService.saveCategory(result.data).subscribe({
            next: (response) => {
              this.openSnackBar('Category created successfully', 'Success');
              this.loadCategories(); // Recargar desde el backend
            },
            error: (error) => {
              this.openSnackBar('Error creating category', 'Error');
            },
          });
        }
      } else {
        this.openSnackBar('Category save cancelled', 'Cancelled');
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 3000 });
  }

  confirmDelete(id: number, name: string): void {
    const dialogRef = this.dialog.open(ConfirmAction, {
      width: '400px',
      data: {
        title: 'Delete Category',
        message: `Are you sure you want to delete the category "${name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.openSnackBar('Category deleted successfully', 'Success');
        this.loadCategories();
      },
      error: (error) => {
        this.openSnackBar('Error deleting category', 'Error');
      },
    });
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
