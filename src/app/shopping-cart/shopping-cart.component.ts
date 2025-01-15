import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Pizza } from '../build-pizza/build-pizza.component';
import { CurrencyPipe } from "../pipes/currency.pipe";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { stringToNumber } from '../utils';
import { User, UserService } from '../services/user.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, MatButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  stringToNumber = stringToNumber;
  public pizzaCollection: WritableSignal<Pizza[]> = signal([]);
  user:User | any;

  total: Signal<number> = computed(() => {
    return this.pizzaCollection().reduce((sum, pizza) => {
    debugger      
      sum += 800;
      sum += pizza.toppings.reduce((toppingSum, topping) => toppingSum + stringToNumber(topping.price), 0);
      return sum;
    }, 0);
  });

  constructor(private shoppingCart: CartService, private router: Router, private userService:UserService, private popupService:PopupService) {
    if (userService.user === "offline") {
      popupService.showPopup("forceLogin");
    } else {
      this.user = userService.user;
    }

    this.pizzaCollection.set(shoppingCart.pizzaInCart());
    this.checkAccessibility();
  }

  checkAccessibility(){
    if(this.shoppingCart.pizzaInCart().length === 0){
      this.router.navigate(['']);
    }
  }

  submitOrder(){
    this.shoppingCart.orderpizza();
    this.exportToPDF();
    this.router.navigate(['success']);
  }


  async exportToPDF() {
    const element = document.querySelector('table');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = 10;
  
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Invoice', pageWidth / 2, position, { align: 'center' }); // Zentriert
      position += 10;
  
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const deliveryAddress = `
        Delivery Address:
        ${this.user?.firstname + this.user?.lastname},
        ${this.user.street} ${this.user.house_nr},
        ${this.user.postal_code},
      `;

      const addressLines = pdf.splitTextToSize(deliveryAddress, 180);
      pdf.text(addressLines, 10, position);
      position += addressLines.length * 6 + 10;
  
      const message =
        'Thank you for your order! Please ensure payment upon delivery. Our delivery driver is already on the way to you.';
      const messageLines = pdf.splitTextToSize(message, 180);
      pdf.text(messageLines, 10, position);
      position += messageLines.length * 6 + 10;
  
      
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      position += imgHeight + 10;
  
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text(
        'If you have any questions about this invoice, please contact us at support@example.com.',
        10,
        position
      );
  
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      window.open(pdfUrl);
    }
  }
  

}
