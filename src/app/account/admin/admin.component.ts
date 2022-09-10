import { Component, OnInit } from '@angular/core';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { environment as env } from 'src/environments/environment.prod';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  role: string = "";
  user_address: string = "";
  isLoaded = false;

  constructor(
    private connectService: ConnectService,
    private accountService: AccountService,
    private alertService: AlertService,
    private loadService: LoadServiceService
  ) { }

  ngOnInit(): void {

  }

  async grantRole() {

    if (this.role == "") {
      this.alertService.alert("Select Role", "danger");
      return;
    }
    else if (this.user_address == "") {
      this.alertService.alert("Enter user's address", "danger");
      return;
    }

    const web3 = await this.connectService.checkConnection();
    const bytesRole = await this.accountService.getRole(this.role)
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi, env.usersAddr)
    this.loadService.Loader("Loading")
    return await newUser.methods.grantRole(bytesRole, this.user_address).
      send({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        this.alertService.alert("Role permission granted", "success");
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.isLoaded = true;
        this.loadService.hideLoader();
      })
  }

  async revokeRole() {

    if (this.role == "") {
      this.alertService.alert("Select Role", "danger");
      return;
    }
    else if (this.user_address == "") {
      this.alertService.alert("Enter user's address", "danger");
      return;
    }

    const web3 = await this.connectService.checkConnection();
    const bytesRole = await this.accountService.getRole(this.role)
    const newUser = new this.connectService.web3.eth.Contract(env.usersAbi, env.usersAddr);
    this.loadService.Loader("");
    return await newUser.methods.revokeRole(bytesRole, this.user_address).
      send({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        this.alertService.alert("Role permssion revoked", "success");
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.isLoaded = true;
        this.loadService.hideLoader();
      })
  }




}
