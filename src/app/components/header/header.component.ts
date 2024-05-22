import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar"
import { WalletComponent } from '../wallet/wallet.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, WalletComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
