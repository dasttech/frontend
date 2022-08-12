import { Injectable } from '@angular/core';
import { LoadServiceService } from '../loading/load-service.service';
import { Contact } from '../models/contact';
import { NextOfKin } from '../models/nextofkin';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isloaded = false;
  myAccount:User = new User("","","","","","","","","","","","","");
  nextOfKin:NextOfKin = new NextOfKin(0,"","","","","");
  tContacts:Contact[] = [];
  
  constructor(
    private connectService:ConnectService,
    private loadService:LoadServiceService,
    private alertService:AlertService
    ) { 
  }

  get getUser(){
    return this.myAccount;
  }

  get getNkin(){
    return this.nextOfKin;
  }

  get getTContact(){
    return this.tContacts;
  }

  async fetchUserData(platformToken:string){
    const web3 = await this.connectService.checkConnection();
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    await newUser.methods.fetchUserData(platformToken).call({from:this.connectService.accounts[0]}).then((data:any)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
      this.myAccount = data[0];
      this.nextOfKin = data[1];
      this.tContacts = data[2];
     
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
    })
  }
  

}
