import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }
  icon1 = 'assets/icons/Launch Icon.png';
  icon2 = 'assets/icons/Burning_Icon.png';
  icon3 = 'assets/icons/shield.png';
  forward = 'assets/icons/arrow.png';
}
