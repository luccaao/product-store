import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  MatSnackBar = inject(MatSnackBar);
  productsService = inject(ProductsService);
  router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];


  onSubmit(product: Product) {
    

    this.productsService
      .patch(this.product.id as string, {
        name: product.name,
        price: product.price
      })
      .subscribe(() => {
        this.MatSnackBar.open('Produto editado com sucesso!', 'OK', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['']);
      });
  }
}
