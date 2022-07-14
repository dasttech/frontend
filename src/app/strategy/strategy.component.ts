import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  strategy = 'assets/icons/strategy.png';
  ideology = 'assets/icons/ideology.png';
  main = 'assets/images/ideology image.png';

}
