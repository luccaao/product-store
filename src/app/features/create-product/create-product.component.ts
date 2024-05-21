import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  form = new FormGroup({
    name: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form.value);
    this.form.controls.name.value;
    this.form.controls.price.value;
  }

  
}
