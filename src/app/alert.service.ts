import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


 alert = (message:string, type:string) => {
  
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  if(alertPlaceholder){
    alertPlaceholder.append(wrapper)
    setTimeout(()=>{
      const close = document.querySelector(".btn-close") as HTMLElement;
      if(close){close.click()}
    },2000)
  }
}



}
