import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService {
  
  showLoader:boolean = false;
  message:string = "Loading";

  constructor() { }
  

  Loader(newMessage:string){
    
    this.message =newMessage;
    this.showLoader = true;
  }

  hideLoader(){
    this.showLoader= false;
  }

}
