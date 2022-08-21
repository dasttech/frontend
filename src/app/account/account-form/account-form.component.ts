import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { WelcomeMessage } from 'src/app/models/welcome-message';
import { MessageService } from 'src/app/services/message.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { environment as env} from 'src/environments/environment.prod';


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
        others:string = "{}";
        welcomeMessage:WelcomeMessage = new WelcomeMessage(this.email);

  constructor(
    public connectService:ConnectService,
    public alertService: AlertService,
    public countries:CountriesService,
    public loadService:LoadServiceService,  
    private message:MessageService,
    private router:Router,
    private tokenService:TokenService
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

    this.loadService.Loader("Creating Account")
    const web3 = await this.connectService.checkConnection();
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts()

   try{await newUser.methods.createAccount(
        this.connectService.getCreds.platformToken,
       
         [        
         "0",
        accounts[0],
        this.tokenService.generateToken(10),
        this.fullname,
        "",
        this.email,
        this.countrycode+"-"+this.phone.toString(),
        this.country,
        this.street_address,
        Math.ceil(Math.random()*100000),
        this.others,
         ]).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account created successfully",
      "Success");
    this.loadService.hideLoader();
    this.message.sendMail(
      "ACCOUNT CREATED",
      `Dear ${this.fullname} your DAST account was created successfully.
      We look forward to supporting you along the way.” “Congratulations on the new position, and many good wishes for your first day at [company name]. We want you to know that we believe in you and we're behind you in everything you do here. A warm welcome from the whole team here at DAST`,
      "admin@dast.tech",
      "DAST",
      this.email,
      this.fullname,
      "welcome",
      this.connectService.getCreds.apiToken 
      ).subscribe({
        next: ()=>{}
      })
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
finally{
  this.router.navigateByUrl("/account")
}
// 
  }

}
