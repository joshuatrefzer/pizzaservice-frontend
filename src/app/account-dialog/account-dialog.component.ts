import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-dialog',
  imports: [MatButtonModule],
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent {
  isOnline:boolean;

  constructor(private userService: UserService, private router:Router) {
    if (userService.user === "offline") {
      this.isOnline = false;
    } else {
      this.isOnline = true;
    }
  }

  public logout(){
    this.userService.logout();
  }

  public toLogin() {
    this.router.navigate(['login']);
  }

}
