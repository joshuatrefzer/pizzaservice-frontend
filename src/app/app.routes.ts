import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SuccessComponent } from './success/success.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'build-pizza', component: BuildPizzaComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'success', component: SuccessComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
];
