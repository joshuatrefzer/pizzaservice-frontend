import { Component, model, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from './services/cart.service';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { PopupService } from './services/popup.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,  HeaderComponent,  MatIconModule, MatButtonModule, MatBadgeModule, AccountDialogComponent , CommonModule, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authenticationActive: WritableSignal<boolean> = signal(true);
  popup: WritableSignal<boolean> = signal(false);

  title = 'pizzaservice';

  constructor(public cart: CartService, private router: Router, public popupService:PopupService, private userService: UserService) {
    userService.checkForUser();
    this.handleHeader();
  }

  handleHeader(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        if (currentUrl === '/login' || currentUrl === '/signup') {
          this.authenticationActive.set(true);
        } else {
          this.authenticationActive.set(false);
        } 
      }
    });
  }

  navigateToCart(){
    this.router.navigate(['/shopping-cart']);
  }

  togglePopup(event:any): void {
    this.popup.set(event); 
  }



}
