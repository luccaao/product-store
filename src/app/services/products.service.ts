import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  constructor() {}

  getAllProducts() {
    return this.httpClient.get<Product[]>('http://localhost:3000/products');
  }

  post(payload: ProductPayload) {
    return this.httpClient.post('http://localhost:3000/products', payload);
  }

  patch(id:string, payload: ProductPayload) {
    return this.httpClient.patch(`http://localhost:3000/products/${id}`, payload);
  }
}
