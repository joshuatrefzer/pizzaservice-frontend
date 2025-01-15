import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  imgIndex:WritableSignal<number> = signal(1);
  showAnimation:WritableSignal<boolean>  = signal(true);

  ngOnInit(): void {
      this.startSlideshow();
  }

  private startSlideshow() {
    setInterval(() => {
      this.triggerAnimation();
      if (this.imgIndex() == 3) {
        this.imgIndex.set(1);
      } else {
        this.imgIndex.update(value => value + 1);
      }
    }, 7000);
  }

  private triggerAnimation() {
    this.showAnimation.set(true);
    setTimeout(() => {
      this.showAnimation.set(false);
    }, 2000);
  }

}
