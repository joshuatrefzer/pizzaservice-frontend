import { Component } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  
  constructor(public popupService: PopupService, public router: Router){

  }


  public checkCase(type:string){
    if (this.popupService.type === type) {
      return true;
    } else {
      return false;
    }
  }

}
