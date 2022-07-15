import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  constructor(
    public connectService:ConnectService,
    private accountService:AccountService
    ) { }

  menuVariable:boolean = false;
  menu_icon_variable:boolean = false;
  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

  get getIsLoaded(){
    return this.accountService.isloaded;
  }
  get getIsConnected(){
    return this.connectService.isConnected;
  }

  ngOnInit(): void {
  }
  logo = 'assets/images/logo.png';
  twitter = 'assets/icons/twitter.png';
  telegram = 'assets/icons/telegram.png';
  rocket = 'assets/icons/rocket.png';

 

  
}
