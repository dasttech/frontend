import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams = [
    {
      name:"DOMINION NDUBISI",
      position:"CEO",
      twitter:"https://twitter.com/EzeDominion2?t=fVVKYgiBeXvRRBXYWv4pEg&s=09",
      linkedin:"https://www.linkedin.com/in/dominiondu",
      image:"assets/images/dominion.png"
    },
    {
      name:"EZE PRAISE ",
      position:"CMO",
      twitter:"https://twitter.com/Praisenew?t=oocAqbqXrza1MxlQBL5hUw&s=09",
      linkedin:"https://www.linkedin.com/in/eze-praise-043baa132",
      image:"assets/images/praisegod.png"
    },
    {
      name:"IYIDA CLEMENT",
      position:"CTO",
      twitter:"https://twitter.com/IyidaIk?t=Vy81oby1kV5Am9kcOE808Q&s=09",
      linkedin:"https://www.linkedin.com/in/iyidaclem",
      image:"assets/images/clement.png"
    },
    {
      name:"EZE PHILIP ",
      position:"Community Lead",
      twitter:"https://www.linkedin.com/in/eze-philip-5060325a",
      linkedin:"https://www.linkedin.com/in/eze-philip-5060325a",
      image:"assets/images/philip.png"
    },
    {
      name:"NNADI PETER",
      position:"Product Designer ",
      twitter:"https://twitter.com/itz_peta?t=KNRCDZfj59IepBrgaqeUpw&s=09",
      linkedin:"https://www.linkedin.com/in/peter-nnadi-ab02a519b",
      image:"assets/images/peter.png"
    },
    {
      name:"CHIMEZIE CHUTA",
      position:"Advisor - Funding & Partnerships",
      twitter:"https://twitter.com/ChimezieChuta?t=HRzVLUf2OW8B1jkYu1RGNg&s=09",
      linkedin:"https://www.linkedin.com/in/chimeziechuta",
      image:"assets/images/chuta.png"
    },
    {
      name:"JUDE JUVENTUS",
      position:"Advisor -Technical",
      twitter:"https://twitter.com/juven2s?s=09",
      linkedin:"https://www.linkedin.com/in/kue-barinor-paul-0793a3b3",
      image:"assets/images/juventus.png"
    },
    {
      name:"FRANKLIN PETERS",
      position:"Advisor -Funding & Partnerships",
      twitter:"https://twitter.com/B__Oracle?t=K5SVcHjLyIjDfhKYJ_4y_Q&s=09",
      linkedin:"https://www.linkedin.com/in/franklin-peters-fims-b5452795",
      image:"assets/images/frank.png"
    },
    {
      name:"BARR. KUE BARINOR PAUL",
      position:"Advisor -Legals",
      twitter:"https://twitter.com/KueBarinor?t=9NOayuIPS2Vm_hOEkq2JQQ&s=09",
      linkedin:"https://www.linkedin.com/in/kue-barinor-paul-0793a3b3",
      image:"assets/images/bar.png"
    }
  ];
  dominion = 'assets/images/dominion.png';
  praisegod = 'assets/images/praisegod.png';
  clement = 'assets/images/clement.png';
  philip = 'assets/images/philip.png';
  chuta = 'assets/images/chuta.png';
  juventus = 'assets/images/juventus.png';
  bar = 'assets/images/bar.png';
  frank = 'assets/images/frank.png';
  peter = 'assets/images/peter.png';
  avatar8 = 'assets/images/avatar8.png';
  twitter = 'assets/icons/twitter.png';
  linkedin = 'assets/icons/linkedin.png';
  website = 'assets/icons/website.png';
  constructor() { }

  ngOnInit(): void {
  }

}
