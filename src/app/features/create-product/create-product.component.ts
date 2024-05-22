import { Component, inject } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  productsService = inject(ProductsService);

  MatSnackBar = inject(MatSnackBar);
  router = inject(Router);


  onSubmit(product: Product) {
    this.productsService
      .post(product)
      .subscribe(() => {
        this.MatSnackBar.open('Produto criado!', 'OK', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['']);
      });
  }
}
