import { Injectable } from '@angular/core';
import { LoadServiceService } from '../loading/load-service.service';
import { Contact } from '../models/contact';
import { NextOfKin } from '../models/nextofkin';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';
import { environment as env } from 'src/environments/environment.prod';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isloaded = false;
  myAccount:User = new User("","","","","","","","","","","","","");
  nextOfKin:NextOfKin = new NextOfKin(0,"","","","","");
  tContacts:Contact[] = [];

  isAdmin = false;
  isDefaultAdminRole = false;
  isValidator = false;
  
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

  get ADMIN(){
    return this.isAdmin;
  }

  get VALIDATOR(){
    return this.isValidator;
  }

  get DEFAULT_ADMIN_ROLE(){
    return this.isDefaultAdminRole;
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
    });

    this.isDefaultAdminRole = await this.checkRole("DEFAULT_ADMIN_ROLE");
    this.isAdmin = await this.checkRole("ADMIN");
    this.isValidator = await this.checkRole("VALIDATOR");

  }

  async checkRole(role:string){
    const web3 = await this.connectService.checkConnection();
    const bytesRole = await this.getRole(role)
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    return await newUser.methods.hasRole(bytesRole,this.connectService.accounts[0]).
    call({from:this.connectService.accounts[0]}).
    then((data:any)=>{
     return data;     
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
    })
  }

  
  async getRole(role:string){
    const web3 = await this.connectService.checkConnection();
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    if(role=="ADMIN"){
      return await newUser.methods.ADMIN().
    call({from:this.connectService.accounts[0]}).
    then((data:any)=>{
     return data;     
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
    })
    }
    else  if(role=="VALIDATOR"){
      return await newUser.methods.VALIDATOR().
    call({from:this.connectService.accounts[0]}).
    then((data:any)=>{
     return data;     
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
    })
    }
    else  if (role=="DEFAULT_ADMIN_ROLE"){
      return await newUser.methods.DEFAULT_ADMIN_ROLE().
    call({from:this.connectService.accounts[0]}).
    then((data:any)=>{
     return data;     
    }).catch((err:Error)=>{
      this.isloaded = true;
      this.loadService.hideLoader();
    })
    }
  }
}
