import { Component, Input, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { AlertService } from 'src/app/alert.service';
import { ConnectService } from 'src/app/connect.service';
import { CountriesService } from 'src/app/countries.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

        id:string = "";
        wallet_addr:string = "";
        fullname:string = "";
        avatar:string = "";
        email:string = "";
        phone:string = "";
        country:string = "";
        street_address:string = "";
        next_of_kin:string = "";
        next_of_kin_phone:string = "";
        next_of_kin_email:string = "";
        other:string = "";

  constructor(
    public connectService:ConnectService,
    public alertService: AlertService,
    public countries:CountriesService
  
    ) { 
    }

  ngOnInit(): void {
  }

  get countrycode(){
    return this.country.split(",",3)[2]
  }
  createAccount(){
    if(this.fullname==""){this.alertService.alert("Enter full name", "danger"); return}
    if(this.email==""){this.alertService.alert("Enter your email address", "danger"); return}
    if(this.country==""){this.alertService.alert("Choose country", "danger"); return}
    if(this.phone==""){this.alertService.alert("Enter phone number", "danger"); return}
    if(this.street_address==""){this.alertService.alert("Enter street address", "danger"); return}
    if(this.next_of_kin==""){this.alertService.alert("Nexf of Kin name", "danger"); return}
    if(this.next_of_kin_phone==""){this.alertService.alert("Enter next of Kin phone number", "danger");return;}
    if(this.next_of_kin_email==""){this.alertService.alert("Enter of kin email address", "danger");return;}

    this.connectService.togglerLoader();
    
 

  }

}
