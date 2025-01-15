import { Injectable, signal, WritableSignal } from '@angular/core';
import { Pizza } from '../build-pizza/build-pizza.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { take } from 'rxjs';
import { UserService } from './user.service';
import { stringToNumber } from '../utils';
import { HttpResponse } from './pizza-data.service';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  stringToNumber = stringToNumber;
  pizzaInCart: WritableSignal<Pizza[]> = signal([]);

  constructor(private http:HttpClient, private userService: UserService, private popupService:PopupService) {}

  public orderpizza(){
    let data;
    if (this.userService.user !== "offline") {
       data = {
        user_id:stringToNumber(this.userService.user.id),
        pizzas: this.pizzaInCart()
      }
    }
    
    const url = environment.baseUrl + "order.php";
    this.http.post<HttpResponse>(url, data).
    pipe(take(1)).subscribe(
      response => {
        if (response.status == "error") {
          this.popupService.showPopup("error" , "error by requesting your order..");
        } 
        if (response.status == "success") {
          this.pizzaInCart.set([]);
          
        }
      }
    );
  }








}


