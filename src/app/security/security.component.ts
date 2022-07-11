import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  iconA = 'assets/icons/Save_Asset.png';
  iconB = 'assets/icons/Secured_Wallets.png';
  iconC = 'assets/icons/Recover Assets.png';
}
