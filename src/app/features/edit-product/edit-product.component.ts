import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  MatSnackBar = inject(MatSnackBar);
  productsService = inject(ProductsService);
  router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  form = new FormGroup({
    name: new FormControl<string>(this.product.name , {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number>(this.product.price, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.MatSnackBar.open('Preencha todos os campos!', 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.productsService
      .patch(this.product.id as string, {
        name: this.form.controls.name.value,
        price: this.form.controls.price.value,
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
