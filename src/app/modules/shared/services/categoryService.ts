import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = 'http://localhost:8080/api/v1';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  /**
   * get all categories
   * @returns Observable of categories
   */
  getCategories() {
    const endpoint = `${apiUrl}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * Get a category by ID
   * @param id Category ID to retrieve
   * @returns Observable of the category
   */
  getCategoryById(id: any) {
    const endpoint = `${apiUrl}/categories/${id}`;
    return this.http.get(endpoint);
  }

  /**
   * Save a new category
   * @param body Category data to save
   * @returns Observable of the saved category
   */
  saveCategory(body: any) {
    const endpoint = `${apiUrl}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * Update an existing category
   * @param id Category ID to update
   * @param body Updated category data
   * @returns Observable of the updated category
   */
  updateCategory(id: number, body: any) {
    const endpoint = `${apiUrl}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * Delete a category
   * @param id Category ID to delete
   * @returns Observable of the deletion result
   */
  deleteCategory(id: number) {
    const endpoint = `${apiUrl}/categories/${id}`;
    return this.http.delete(endpoint);
  }
}
