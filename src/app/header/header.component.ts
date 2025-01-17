import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() popupChange = new EventEmitter<boolean>();

  constructor(private popupService: PopupService){}

  private popupState: boolean = false; 

  public togglePopup(): void {
    this.popupService.showPopup("accountHandling");

    // this.popupState = !this.popupState;          
    // this.popupChange.emit(this.popupState);      
  }




}
