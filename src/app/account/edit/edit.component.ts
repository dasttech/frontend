import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { User } from 'src/app/models/user';
import { WelcomeMessage } from 'src/app/models/welcome-message';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { MessageService } from 'src/app/services/message.service';
import { AccountComponent } from '../account.component';
import { AccountService } from '../account.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
  welcomeMessage:WelcomeMessage = new WelcomeMessage(this.email,"Account update","",this.fullname,"Your account was updated");

  constructor(
    private accountService:AccountService,
    public connectService:ConnectService,
    public alertService: AlertService,
    public countries:CountriesService,
    public loadService:LoadServiceService,  
    private message:MessageService,
    private router:Router

  ) { }

  ngOnInit(): void {

    this.id = this.accountService.getUser.id;
    this.wallet_addr = this.accountService.getUser.wallet_addr;
    this.fullname = this.accountService.getUser.fullname;
    this.avatar = this.accountService.getUser.avatar;
    this.email = this.accountService.getUser.email;
    this.phone = this.accountService.getUser.phone.split("-",2)[1];
    this.country = this.accountService.getUser.country;
    this.street_address = this.accountService.getUser.street_address;
    this.next_of_kin = this.accountService.getUser.next_of_kin;
    this.next_of_kin_phone = this.accountService.getUser.next_of_kin_phone.split("-",2)[1];
    this.next_of_kin_email = this.accountService.getUser.next_of_kin_email;
    this.others = this.accountService.getUser.others;

  }

  get countrycode(){
   try {
    return this.country.split(",",3)[2];
   } catch (error) {
    return ""
   }
  }

  get mycountry(){
    return this.country.split(',',3);

  }

  get getUser (){ return this.accountService.getUser;}

  async updateAccount(){
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
    const editedUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
   try{
    await editedUser.methods.editAccount(
        this.connectService.getCreds.platformToken,
       
         [
          0,
        accounts[0],
        "",
        this.fullname,
        "",
        this.email,
        this.countrycode+"-"+this.phone.toString(),
        this.country,
        this.street_address,
        "",
        this.others,
         ]
      
      ).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account updated successfully",
      "Success");
    this.loadService.hideLoader();
    this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
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
    this.alertService.alert("Account updated failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed.","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
  
}finally{
  this.router.navigateByUrl("/account/profile")
}
// // 
  }

}
