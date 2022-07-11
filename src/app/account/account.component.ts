import { Component, OnInit } from '@angular/core';
import { id } from 'ethers/lib/utils';
import { ConnectService } from '../connect.service';
import { User } from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isloaded = true;
  myAccount:User = new User("","","","","","","","","","","","");
  
  constructor(private connectService:ConnectService) { }

  ngOnInit(): void {
this.connectService.checkConnection()
  }

  get isAccountCreated(){
    return this.myAccount.fullname;
  }
}
