import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [MatButtonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  constructor(private router: Router){}

  backToPage(){
    this.router.navigate(['']);
  }
}
