import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface CategoryDialogData {
  id?: number;
  name: string;
  description: string;
}

export interface CategoryDialogResult {
  success: boolean;
  data?: {
    id?: number;
    name: string;
    description: string;
  };
}

@Component({
  selector: 'app-category-dialog',
  standalone: false,
  templateUrl: './category-dialog.html',
  styleUrl: './category-dialog.css',
})
export class CategoryDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CategoryDialog>);
  readonly data = inject<CategoryDialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  
  public categoryForm!: FormGroup;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close({
        success: true,
        data: {
          id: this.data.id,
          name: this.categoryForm.value.name,
          description: this.categoryForm.value.description
        }
      });
    }
  }
}
