import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { take } from 'rxjs';

export interface HttpResponse {
  status: string,
  data: any
  message?:string
  user?:any
}

@Injectable({
  providedIn: 'root'
})
export class PizzaDataService {
  pizzaDough:WritableSignal<any> = signal([]);
  toppings:WritableSignal<any> = signal([]);



  constructor(private http: HttpClient) {

  }

  public fetchPizzData(){
    this.fetchDough();
    this.fetchToppings();
  }



  private fetchToppings(){
    const url = environment.baseUrl + 'get_ingredients.php';

    this.http.get<HttpResponse>(url).pipe(take(1))
    .subscribe( response => {
      if (response.status == "success") {
        this.toppings.set(response.data);
        console.log(this.toppings);
        
      } else {
        throw console.error("Fetching topping - data failed");
      }
    });
  }

  private fetchDough(){
    const url = environment.baseUrl + 'get_pizza_dough.php';
    
    this.http.get<HttpResponse>(url).pipe(take(1))
    .subscribe(response => {
      if (response.status == "success") {
        this.pizzaDough.set(response.data);
        console.log(this.pizzaDough());
        
      } else {
        throw console.error("Fetching pizzadough - data failed");
      }
    });
  }
}

