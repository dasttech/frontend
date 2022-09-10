import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  logo = 'assets/images/logo.png';
  twitter = 'assets/icons/twitter.png';
  telegram = 'assets/icons/telegram.png';
  rocket = 'assets/icons/rocket.png';

  constructor(
    public connectService: ConnectService,
    private accountService: AccountService,
    private alertService:AlertService
  ) { }

  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  get getIsLoaded() {
    return this.accountService.isloaded;
  }
  get getIsConnected() {
    return this.connectService.isConnected;
  }
  get myaddr() {
    return this.connectService.accounts[0];
  }

  isAdmin = false;
  isValidator = false;
  isDefaultAdmin = false;




  async ngOnInit(): Promise<void> {

    setInterval(() => {
      this.isAdmin = this.accountService.ADMIN;
      this.isValidator = this.accountService.VALIDATOR;
      this.isDefaultAdmin = this.accountService.DEFAULT_ADMIN_ROLE;
    },1000)
  }

  async copyUserAddress(){
    navigator.clipboard.writeText(this.myaddr);
    this.alertService.alert("Copied!","dark")
  }

}
