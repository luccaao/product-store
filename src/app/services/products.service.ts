import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  constructor() {}

  getAllProducts() {
    return this.httpClient.get<Product[]>('http://localhost:3000/products');
  }
}
