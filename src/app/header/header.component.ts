import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() popupChange = new EventEmitter<boolean>();

  private popupState: boolean = false; // Lokaler Zustand

  public togglePopup(): void {
    this.popupState = !this.popupState;          
    this.popupChange.emit(this.popupState);      
  }




}
