import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  // avatar = 'assets/images/Avatar.png';
  check = 'assets/icons/Check.png';
  nocheck = 'assets/icons/nocheck.png';

  constructor() { }

  ngOnInit(): void {
  }

}
