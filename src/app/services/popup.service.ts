import { Injectable, Type } from '@angular/core';

export type PopupType = "signUpSuccess" | "error" | "info" | "forceLogin" | undefined; 

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  message:string = "";
  status: "open" | "closed" = "closed";
  type:PopupType  = undefined;
  disappearAfter:number = 0; //ms
 
  constructor() {}

  public showPopup(type:PopupType, message?:string, time?:number) {
    this.status = "open";
    this.type = type;
    if (time) { 
      this.disappearAfter = time;
      this.closeAfterTime()
    }
    if (message) {
      this.message = message;
    }
  }

  private closeAfterTime() {
    setTimeout(() => {
      this.closePopup();
    }, this.disappearAfter);
  }

  public closePopup() {
    this.status = "closed";
    this.message = "";
    this.disappearAfter = 0;
  }




}
