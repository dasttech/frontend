import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  avatar = 'assets/images/Avatar.png';
  avatar1 = 'assets/images/Avatar-1.png';
  avatar2 = 'assets/images/Avatar2.png';
  avatar22 = 'assets/images/Avatar-2.png';
  avatar3 = 'assets/images/Avatar-3.png';
  avatar4 = 'assets/images/Avatar-4.png';
  avatar5 = 'assets/images/Avatar-5.png';
  avatar6 = 'assets/images/Avatar-6.png';
  avatar7 = 'assets/images/Avatar-7.png';
  avatar8 = 'assets/images/Avatar-8.png';
  twitter = 'assets/icons/twitter.png';
  linkedin = 'assets/icons/linkedin.png';
  website = 'assets/icons/website.png';
  constructor() { }

  ngOnInit(): void {
  }

}
