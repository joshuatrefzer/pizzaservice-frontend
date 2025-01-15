import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { HttpResponse } from './pizza-data.service';
import { PopupService } from './popup.service';
import { Router } from '@angular/router';

export interface User {
  id?:string,
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  street: string,
  house_nr: string,
  postal_code: string
}

export type UserLogin = Pick<User, 'username' | 'password'>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User | "offline" = "offline";

  constructor(private http: HttpClient, private popupService: PopupService, private router:Router) {}

  public signUp(userData: User) {
    let url = environment.baseUrl + 'sign_up.php';

    this.http.post<HttpResponse>(url, userData)
      .pipe(take(1)).subscribe(
        response => {
          if (response.status == "success") {
            this.popupService.showPopup("signUpSuccess");
          } 
          if (response.status == "error") {
            this.popupService.showPopup("error", response.message);
          }
        }
      );
  }


  public login(userData: UserLogin) {
    let url = environment.baseUrl + 'login.php';

    this.http.post<HttpResponse>(url, userData)
      .pipe(take(1)).subscribe(
        response => {
          if (response.status == "success") {
            this.popupService.showPopup("info" , "login successful!" , 3000);
            this.router.navigate(['']);
            this.saveUser(response.user);
          } 
          if (response.status == "error") {
            this.popupService.showPopup("error", response.message);
          }
        }
      );
  }

  public checkForUser(){
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.user = "offline";
    }
  }

  private saveUser(user:User){
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      localStorage.removeItem("user");
    }

    this.user = user;
    localStorage.setItem("user" , JSON.stringify(user));
  }

  public logout(){
    localStorage.removeItem("user");
    this.router.navigate(['']);
    this.popupService.showPopup("info" , "Logout successful, if you want to order something, you need to login again.");
  }

}
