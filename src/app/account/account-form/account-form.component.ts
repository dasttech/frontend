import { Component, Input, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { User } from 'src/app/models/user';
import Users from "artifacts/contracts/Users/Users.sol/Users.json"
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json"
import { AbiItem } from 'web3-utils';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { WelcomeMessage } from 'src/app/models/welcome-message';
import { MessageService } from 'src/app/services/message.service';
import { from } from 'rxjs';

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
        others:string = "{}";
        welcomeMessage:WelcomeMessage = new WelcomeMessage(this.email);

  constructor(
    public connectService:ConnectService,
    public alertService: AlertService,
    public countries:CountriesService,
    public loadService:LoadServiceService,  
    private message:MessageService
    ) { 
    }

  ngOnInit(): void {
  }

  get countrycode(){
    return this.country.split(",",3)[2]
  }

  get mycountry(){
    return this.country.split(',',3);

  }

  async createAccount(){
    if(this.fullname==""){this.alertService.alert("Enter full name", "danger"); return}
    if(this.email==""){this.alertService.alert("Enter your email address", "danger"); return}
    if(this.country==""){this.alertService.alert("Choose country", "danger"); return}
    if(this.phone==""){this.alertService.alert("Enter phone number", "danger"); return}
    if(this.street_address==""){this.alertService.alert("Enter street address", "danger"); return}
    if(this.next_of_kin==""){this.alertService.alert("Nexf of Kin name", "danger"); return}
    if(this.next_of_kin_phone==""){this.alertService.alert("Enter next of Kin phone number", "danger");return;}
    if(this.next_of_kin_email==""){this.alertService.alert("Enter of kin email address", "danger");return;}

    this.loadService.Loader()
    const web3 = await this.connectService.checkConnection();
    const newUser = new this.connectService.web3.eth.Contract(this.connectService.getCreds.usersAbi,this.connectService.getCreds.users)
    const accounts = await  this.connectService.web3.eth.getAccounts()

   try{await newUser.methods.createAccount(
        this.connectService.getCreds.platformToken,
       
         [
          0,
        accounts[0],
        this.fullname,
        "",
        this.email,
        this.phone.toString(),
        this.country,
        this.street_address,
        this.next_of_kin,
        this.next_of_kin_phone.toString(),
        this.next_of_kin_email,
        this.others,
         ]).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account created successfully",
      "Success");
    this.loadService.hideLoader();
    const sendmail = this.message.sendWelcome(this.welcomeMessage);
    from(sendmail).subscribe(
      {next:data=>{
      },
        error:(data)=>{ 
        this.alertService.alert(data.error.message,"danger")
      }}
      );
   }
   else{
    this.alertService.alert("Account creation failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed. Account may already exist in the database","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  e.message 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e instanceof Error) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
}
// 
  }

}
