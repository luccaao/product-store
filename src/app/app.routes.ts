import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { EditProductComponent } from './features/edit-product/edit-product.component';
import { Product } from './interfaces/product.interface';
import { inject } from '@angular/core';
import { ProductsService } from './services/products.service';

export const routes: Routes = [

    {
        path: "",
        component: ListComponent
    },
    {
        path: "create-product",
        component: CreateProductComponent
    },
    {
        path: "edit-product/:id",
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productsService = inject(ProductsService);
                productsService.patch
            } 
        },
        component: EditProductComponent
    }

];
