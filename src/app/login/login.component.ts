import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserLogin, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService:UserService, private router: Router){
    if (userService.user !== "offline") {
      router.navigate(['']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('' , [Validators.required, Validators.minLength(4)]),
      password: new FormControl('' , [Validators.required, Validators.minLength(8)]),
    });
  }

  public isInvalid(controlname:string) {
      return this.loginForm.get(controlname)?.invalid && this.loginForm.get(controlname)?.touched;
    }
  
    public isValid(controlname:string) {
      return this.loginForm.get(controlname)?.valid;
    }
  
    public submit(){
      if (!this.loginForm.valid) return;
      const data:UserLogin = this.getData();
      this.userService.login(data);
      this.loginForm.reset();
    }
  
    getData():UserLogin {
      const data = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      }
  
      return data;
    }


}
