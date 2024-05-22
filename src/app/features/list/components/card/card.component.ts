import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  product = input.required<Product>()

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  productName = computed(() => this.product().name);
  productPrice = computed(() => this.product().price);


  onDelete() {
    this.delete.emit();
  }
}
