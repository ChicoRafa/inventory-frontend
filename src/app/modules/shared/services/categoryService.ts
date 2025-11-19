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
   * Save a new category
   * @param body Category data to save
   * @returns Observable of the saved category
   */
  saveCategory(body: any) {
    const endpoint = `${apiUrl}/categories`;
    return this.http.post(endpoint, body);
  }
}
