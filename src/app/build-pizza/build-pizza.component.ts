import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Inject, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import { PizzaDataService } from '../services/pizza-data.service';
import { environment } from '../../environments/environment.development';
import { CurrencyPipe } from '../pipes/currency.pipe';
import { stringToNumber } from '../utils';



interface Topping {
  id: number;
  name: string;
  price: number;
  image_url: string;
  selected: boolean;
}

interface Dough {
  id: number,
  image_url: string,
  name: string,
  price: number
}

export interface Pizza {
  id?: number,
  toppings: Topping[],
  dough: string,
  extraWish?: string
}

@Component({
  selector: 'app-build-pizza',
  imports:
    [
      MatExpansionModule,
      CommonModule,
      MatButtonModule,
      MatOptionModule,
      MatSelectModule,
      MatFormFieldModule,
      MatDialogModule,
      FormsModule,
      CurrencyPipe
    ],
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.scss'],
})
export class BuildPizzaComponent {
  stringToNumber = stringToNumber;
  baseUrl = environment.baseUrl;
  extraWish: string = '';
  validationError: string = '';
  readonly panelOpenState = signal(false);
  selectedBasic: WritableSignal<number> = signal(-1);

  selectedToppings: Signal<Topping[]> = computed(() =>
    this.toppings().filter(t => t.selected)
  );

  toppingPrice: Signal<number> = computed(() => {
    let sum = 0;
    this.selectedToppings().forEach(t => {
      sum = sum + stringToNumber(t.price);
    });
    return sum;
  });


  selectedToppingList: Signal<string> = computed(() => {
    if (this.selectedToppings().length === 0) {
      return "choose your topping";
    }

    let string = "";
    this.selectedToppings().forEach((t, index) => {
      if (index > 0) {
        string += " | ";
      }
      string += t.name;
    });

    return string;
  });


  toppings: WritableSignal<Topping[]> = signal([]);
  fetchedToppings: Signal<Topping[]> = computed(() => {
    return this.pizzaService.toppings();
  });

  dough: WritableSignal<Dough[]> = signal([]);
  fetchedDough: Signal<Dough[]> = computed(() => {
    return this.pizzaService.pizzaDough();
  });

  constructor(private shoppingCart: CartService, private pizzaService: PizzaDataService) {
    pizzaService.fetchPizzData();
    this.waitForData();
  }

  public selectBasic(i: number): void {
    this.selectedBasic.set(i);
  }

  private waitForData() {
    const interval = setInterval(() => {
      if (this.dataIsFetched()) {
        this.toppings.set(this.fetchedToppings());
        this.dough.set(this.pizzaService.pizzaDough());
        clearInterval(interval);
      }
    }, 300);
  }

  public dataIsFetched() {
    return this.fetchedToppings().length > 0 && this.fetchedDough().length > 0
  }

  openDialog(): void {
    const dialog = document.querySelector('dialog');
    if (dialog) {
      dialog.showModal();
    }
  }

  closeDialog(shouldResetExtraWish: boolean = false): void {
    const dialog = document.querySelector('dialog');
    dialog?.close();
    if (shouldResetExtraWish) this.extraWish = "";
  }


  submit(): void {
    if (this.extraWish.trim()) {
      console.log('Extra Wunsch:', this.extraWish);
    }
    this.closeDialog(false);
  }

  public addToCart(): void {
    if (this.isFormValid()) {
      this.shoppingCart.pizzaInCart.set(this.getData());
      this.resetForm();
    } else {
      this.showValidationError();
    }
  }

  showValidationError() {
    this.validationError = "please select a dough and a minimum of one topping"
    setTimeout(() => {
      this.validationError = "";
    }, 3000);
  }

  isFormValid(): boolean {
    return this.selectedBasic() !== -1 && this.selectedToppings().length > 0;
  }

  getData(): Pizza[] {
    const pizza: Pizza = {
      toppings: this.selectedToppings(),
      dough: this.dough()[this.selectedBasic()].name,
      extraWish: this.extraWish
    }
    const pizzaCollection = this.shoppingCart.pizzaInCart();
    pizzaCollection.push(pizza)
    return pizzaCollection;
  }

  resetForm() {
    this.toppings.update(currentToppings =>
      currentToppings.map(topping => ({
        ...topping,
        selected: false
      }))
    );

    this.selectedBasic.set(-1);
    this.extraWish = '';
  }

  public selectTopping(i: number): void {
    this.toppings.update(currentToppings =>
      currentToppings.map((topping, index) =>
        index === i
          ? { ...topping, selected: !topping.selected }
          : topping
      )
    );
  }


}
