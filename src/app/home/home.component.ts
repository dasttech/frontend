import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  iswaiting = true;

  constructor(
    private router:Router
  ) { 
  }

  ngOnInit(): void {

    setTimeout(()=>{
      
    let waiting = localStorage.getItem("iswaiting" || "0");
    this.iswaiting = waiting == "1";

    }, 5000)
  }
  key = 'assets/images/key.png';

  async alreadyWaiting(){
    localStorage.setItem("iswaiting", "1");
    window.location.reload();
  }

}
