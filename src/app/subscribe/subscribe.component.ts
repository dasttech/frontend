import { Component, OnInit } from '@angular/core';
import { LoadServiceService } from '../loading/load-service.service';
import { AlertService } from '../services/alert.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
 
  email = "";
  username = "";

  constructor(
    private loadService:LoadServiceService,
    private alertService:AlertService,
    private message:MessageService
  ) { }

  ngOnInit(): void {
  }


  subscribe(){
    this.loadService.Loader("");
    if(this.username.length<3){
      this.loadService.hideLoader();
      this.alertService.alert("Please Enter your name", "danger");
      return;
    }
    else if(!/^\S+@\S+\.\S+$/.test(this.email.trim())){
      this.loadService.hideLoader();
      this.alertService.alert("Invalid Email Format", "danger");
      return;
    }

    this.alertService.alert("Subscription successfull. You will get confirmation mail from us", "success");
    this.loadService.hideLoader();
    this.message.subscribe(
      "Waiting List",
      `Congratulations ${this.username}! You have been added to dast waiting list. 
      You will receive necessary updates as we progress in DAST Developments`,
      this.email,
      this.username
      ).subscribe({
        next: ()=>{}
      })

    this.email = this.username =  "";
  }

}
