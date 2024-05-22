import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { ProductsService } from './products.service';

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

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);
  productsService = inject(ProductsService)


  constructor() {}

  openDialog(): Observable<boolean> {
    return this.matDialog
        .open(ConfirmationDialogComponent, {
        width: '400px',
      })
      .afterClosed();
  }
}
