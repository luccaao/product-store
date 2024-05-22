import { Component, EventEmitter, Output, input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  product = input<Product | null>(null);

  form!: FormGroup;

  
  @Output() done = new EventEmitter<Product>();
  

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.product()?.name || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl<number>(this.product()?.price || 0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    const product = this.form.value as Product
    this.done.emit(product);
    
  }

}
