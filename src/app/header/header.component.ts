import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logo = 'assets/images/logo.png';
  twitter = 'assets/icons/twitter.png';
  telegram = 'assets/icons/telegram.png';
  rocket = 'assets/icons/rocket.png';
}
