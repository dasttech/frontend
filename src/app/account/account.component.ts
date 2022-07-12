import { Component, OnInit } from '@angular/core';
import { id } from 'ethers/lib/utils';
import { AlertService } from '../alert.service';
import { ConnectService } from '../connect.service';
import { LoadServiceService } from '../loading/load-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isloaded = false;
  myAccount:User = new User("","","","","","","","","","","","");
  
  constructor(
    private connectService:ConnectService,
    private loadService:LoadServiceService,
    private alertService:AlertService
    ) { 
    this.loadService.Loader();
  }

  ngOnInit(): void {
        this.loadService.changeMessage("Fetching user data");
    setInterval(async () => {
      if(!this.isloaded&&this.connectService.isConnected){
        await this.fetchUserData(this.connectService.getCreds.platformToken);         
      }
    }, 2000);
    
  }
  
  ngOnDestroy():void{
    this.loadService.hideLoader();
  }

  get isAccountCreated(){
    return this.myAccount.fullname;
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
        this.alertService.alert("Welcome to DAST, create account","info");
    });
  }
  

}
