import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  strategy = 'assets/icons/strategy.png';
  ideology = 'assets/icons/ideology.png';
  main = 'assets/images/ideology image.png';

}
