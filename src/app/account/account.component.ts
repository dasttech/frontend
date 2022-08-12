import { Component, OnInit } from '@angular/core';
import { id } from 'ethers/lib/utils';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';
import { LoadServiceService } from '../loading/load-service.service';
import { User } from '../models/user';
import { AccountService } from './account.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  myAccount:User = new User("","","","","","","","","","","","","");
  userExist:boolean = false;
  constructor(
    private connectService:ConnectService,
    private loadService:LoadServiceService,
    private accountService:AccountService,
    private tokenService:TokenService
    ) { 
    // this.loadService.Loader();
  }

  ngOnInit(): void {
    {
        this.loadService.changeMessage("Fetching user data");
    setTimeout(async () => {
      if(!this.accountService.isloaded&&this.connectService.isConnected){
        await this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
       this.myAccount = this.accountService.getUser; 
    
      }else{
        this.myAccount = this.accountService.getUser;
        this.loadService.hideLoader();
        
        // fetchlatest
        await this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
       this.myAccount = this.accountService.getUser; 
    
    
      }
    }, 0);
  
  }
  }
  
  ngOnDestroy():void{
    this.loadService.hideLoader();  
  }

  get isAccountCreated(){
   try {
    return this.myAccount.fullname.length>0;
    
   } catch (error) {
    return false;
    
   }
  }

}
