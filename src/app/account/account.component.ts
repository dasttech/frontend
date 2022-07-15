import { Component, OnInit } from '@angular/core';
import { id } from 'ethers/lib/utils';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';
import { LoadServiceService } from '../loading/load-service.service';
import { User } from '../models/user';
import { AccountService } from './account.service';

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
    private accountService:AccountService
    ) { 
    this.loadService.Loader();
  }

  ngOnInit(): void {{
        this.loadService.changeMessage("Fetching user data");
    setTimeout(async () => {
      if(!this.accountService.isloaded&&this.connectService.isConnected){
        await this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
       this.myAccount = this.accountService.getUser; 
       this.isloaded = this.accountService.isloaded;   
       console.log(this.myAccount);
      }else{
        this.isloaded = this.accountService.isloaded;
        this.myAccount = this.accountService.getUser;
        this.loadService.hideLoader();
       console.log(this.myAccount);
      }
    }, 0);}
    
  }
  
  ngOnDestroy():void{
    this.loadService.hideLoader();
  }


}
