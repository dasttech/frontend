import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService {
  
  showLoader:boolean = false;
  message:string = "Loading";

  constructor() { }
  

  Loader(){
    this.showLoader = true;
  }

  hideLoader(){
    this.showLoader= false;
  }

  changeMessage(newMessage:string){
    this.message =newMessage;
  }
}
