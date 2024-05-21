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
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  productsService = inject(ProductsService);

  MatSnackBar = inject(MatSnackBar);
  router = inject(Router);



  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number>(0, {
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
      .post({
        name: this.form.controls.name.value,
        price: this.form.controls.price.value,
      })
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
