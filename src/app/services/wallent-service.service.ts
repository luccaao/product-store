import { Injectable, inject } from '@angular/core';
import { Wallet } from '../interfaces/wallet.model';
import { Product } from '../interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WallentServiceService {

  MatSnackBar = inject(MatSnackBar);

  constructor() { }

  walletBalance: Wallet = new Wallet(1240);
  


  getWallet(): Wallet {
    return this.walletBalance;
  
  }

  deposit(amount: number) {
    this.walletBalance.balance += amount
  }

  debit(product: Product) {
    if (this.walletBalance.balance >= product.price) {
      this.walletBalance.balance -= product.price;
      return this.walletBalance.balance;
    } else {
      this.MatSnackBar.open('Sem dinheiro suficiente!', 'OK!')
      return false;
    }
  }
}

