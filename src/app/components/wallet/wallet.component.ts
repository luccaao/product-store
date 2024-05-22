import { Component, inject } from '@angular/core';
import { WallentServiceService } from '../../services/wallent-service.service';
import { Product } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  constructor(private walletService: WallentServiceService) {}

  wallet = this.walletService.walletBalance;

  router = inject(Router);



  buyProduct(product: Product) {
    if (this.walletService.debit(product)) {
        
    } else {
      
    }
  }

  onSubmit() {
    this.router.navigate(['deposit']);
  }

  
}
