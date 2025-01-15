import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private userService:UserService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('' , [Validators.required , Validators.minLength(8)]),
      firstname: new FormControl('' , [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('' , [Validators.required, Validators.minLength(4)]),
      street: new FormControl('' , [Validators.required, Validators.minLength(4)]),
      houseNumber: new FormControl('' , [Validators.required]),
      postalCode: new FormControl('' , [Validators.required]),
    });
  }

  public isInvalid(controlname:string) {
    return this.signUpForm.get(controlname)?.invalid && this.signUpForm.get(controlname)?.touched;
  }

  public isValid(controlname:string) {
    return this.signUpForm.get(controlname)?.valid;
  }

  public submit(){
    if (!this.signUpForm.valid) return;
    const data:User = this.getData();
    console.log(data);
    this.userService.signUp(data);
    this.signUpForm.reset()
  }

  getData():User {
    const data = {
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value,
      firstname: this.signUpForm.get('firstname')?.value,
      lastname: this.signUpForm.get('lastname')?.value,
      street: this.signUpForm.get('street')?.value,
      house_nr: this.signUpForm.get('houseNumber')?.value,
      postal_code:this.signUpForm.get('postalCode')?.value
    }

    return data;
  }

}
