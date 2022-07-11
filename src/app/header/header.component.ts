import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  constructor(
    public connectService:ConnectService
    ) { }

  menuVariable:boolean = false;
  menu_icon_variable:boolean = false;
  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

  ngOnInit(): void {
  }
  logo = 'assets/images/logo.png';
  twitter = 'assets/icons/twitter.png';
  telegram = 'assets/icons/telegram.png';
  rocket = 'assets/icons/rocket.png';

 

  
}
