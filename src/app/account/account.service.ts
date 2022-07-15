import { Injectable } from '@angular/core';
import { LoadServiceService } from '../loading/load-service.service';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isloaded = false;
  myAccount:User = new User("","","","","","","","","","","","");
  
  constructor(
    private connectService:ConnectService,
    private loadService:LoadServiceService,
    private alertService:AlertService
    ) { 
  }

  get getUser(){
    return this.myAccount;
  }

  async fetchUserData(platformToken:string){
    const web3 = await this.connectService.checkConnection();
    const newUser = new this.connectService.web3.eth.Contract(this.connectService.getCreds.usersAbi,this.connectService.getCreds.users)
    await newUser.methods.fetchUserData(platformToken).call({from:this.connectService.accounts[0]}).then((data:User)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
      this.myAccount = data;
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
        this.alertService.alert("Welcome to DAST, create account new account","info");
    });
  }
  

}
