import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  icon1 = 'assets/icons/Launch Icon.png';
  icon2 = 'assets/icons/Burning_Icon.png';
  icon3 = 'assets/icons/shield.png';
  forward = 'assets/icons/arrow.png';
}
