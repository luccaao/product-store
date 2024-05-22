import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../interfaces/product.interface';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { WallentServiceService } from '../../services/wallent-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: any[] = [];


  MatSnackBar = inject(MatSnackBar);
  walletService = inject(WallentServiceService);
  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
     this.router.navigate(['/edit-product', product.id]);
   
    
  }

  onDelete(product: Product) {
    this.confirmationDialogService.openDialog().subscribe((answer) => {
      if (answer) {
        this.productsService.delete(product.id as string).subscribe(() => {
          this.productsService.getAllProducts().subscribe((products) => {
            this.products = products;
          });
        });
      }
    });
  }

  onBuy(product: Product) {
    this.MatSnackBar.open('Produto comprado com sucesso!', ' Close')
    console.log(product);
    this.walletService.debit(product)
    this.walletService.getWallet();

    
    
  }
}
