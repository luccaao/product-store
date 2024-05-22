import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { EditProductComponent } from './features/edit-product/edit-product.component';
import { Product } from './interfaces/product.interface';
import { inject } from '@angular/core';
import { ProductsService } from './services/products.service';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create-product/create-product.component').then(
        (m) => m.CreateProductComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);

        return productsService.get(route.paramMap.get('id') as string);
      },
    },
    loadComponent: () =>
      import('./features/edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
  },
  {
    path: 'deposit',
    loadComponent: () =>
      import('./features/deposit/deposit.component').then(
        (m) => m.DepositComponent
      ),
  }
];
