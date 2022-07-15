import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private accountService:AccountService,
    private router:Router

  ) { }

  ngOnInit(): void {
    if(!this.accountService.isloaded){
      this.router.navigateByUrl("/account")
    }
  }

  get getUser(){
    return this.accountService.getUser;
  }

}
