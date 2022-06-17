import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-paper',
  templateUrl: './white-paper.component.html',
  styleUrls: ['./white-paper.component.css']
})
export class WhitePaperComponent implements OnInit {
  iDisplay = true;
  tDisplay = true;
  bDisplay = true;
  introDisplay(){
    this.iDisplay = !this.iDisplay;
  };
  tokenDisplay(){
    this.tDisplay = !this.tDisplay;
  };
  burningDisplay(){
    this.bDisplay = !this.bDisplay;
  };


  constructor() { }

  ngOnInit(): void {
  }
  plus = 'assets/icons/plus.png';
}
