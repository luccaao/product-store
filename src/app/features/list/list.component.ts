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

@Component({
  selector: 'app-confirmation-dialog',

  template: `
    <div class="container">
      <div class="content-container">
        <h2 mat-dialog-title>Deletar produto</h2>
        <mat-dialog-content>
          <p>Tem certeza que deseja deletar o produto?</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close (click)="onNo()">Não</button>
          <button
            mat-raised-button
            mat-dialog-close
            cdkFocusInitial
            color="warn"
            (click)="onCofirm()"
          >
            Confirmar
          </button>
        </mat-dialog-actions>
      </div>
    </div>
  `,

  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onCofirm() {
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: any[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmationDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.productsService.delete(product.id as string).subscribe(() => {
            this.productsService.getAllProducts().subscribe((products) => {
              this.products = products;
            });
          });
        }
      });
  }
}
