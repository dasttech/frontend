import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { Recoveryrequests } from 'src/app/models/recoveryrequests';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { TokenService } from 'src/app/services/token.service';
import { environment as env } from 'src/environments/environment.prod';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  pendingRequests: Recoveryrequests[] = [];
  currentitem = "";
  toggleitem = true;
  currentlyValidating = { account_token: null, index: null, status: null, };
  assetOwnersData:any = [];
  myValidationData:any = "";

  constructor(
    private loadService: LoadServiceService,
    private connectService: ConnectService,
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadService.Loader("Wait...");
    if (this.accountService.VALIDATOR) {
      this.pendingRequests = await this.fetchRequests();
      this.currentlyValidating = await this.isValidating();
      this.assetOwnersData = await this.unfinishedValData();
      this.myValidationData = this.currentlyValidating.account_token?await this.getValidationRequest(this.currentlyValidating.account_token):"";
      this.loadService.hideLoader()
    }
    else {
      this.alertService.alert("Access denied", "danger");
      this.router.navigateByUrl("/account");
    }

  }

  ngOnDestroy(): void {
    this.loadService.hideLoader();
  }

  showItem(item: string) {
    if (this.toggleitem) {
      this.currentitem = item;
      this.toggleitem = !this.toggleitem;
    }
    else {
      this.currentitem = "";
      this.toggleitem = !this.toggleitem;
    }
  }

  async fetchRequests() {
    const web3 = await this.connectService.checkConnection();
    const recovery = new this.connectService.web3.eth.Contract(env.recoveryAbi, env.recoveryAddr)
    this.loadService.Loader("Loading")
    return await recovery.methods.fetchRequests(this.connectService.getCreds.platformToken).
      call({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        return data;
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.loadService.hideLoader();
      })
  }

  async acceptValidation(
    account_token: string,
    numberOfContacts?: number
  ) {
    const web3 = await this.connectService.checkConnection();
    const recovery = new this.connectService.web3.eth.Contract(env.recoveryAbi, env.recoveryAddr)
    this.loadService.Loader("Loading")
    return await recovery.methods.acceptValidation(this.connectService.getCreds.platformToken, account_token, numberOfContacts, [account_token, 0, true]).
      send({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        this.alertService.alert("Success", "success");
        this.router.navigateByUrl("account")
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.loadService.hideLoader();
      })
  }

  async isValidating(
  ) {
    const web3 = await this.connectService.checkConnection();
    const recovery = new this.connectService.web3.eth.Contract(env.recoveryAbi, env.recoveryAddr)
    this.loadService.Loader("Loading")
    return await recovery.methods.currentlyValidating(this.connectService.accounts[0]).
      call({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        return data;
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.loadService.hideLoader();
      })
  }


  async unfinishedValData(
  ) {

    this.loadService.Loader("Processing...");
    const web3 = await this.connectService.checkConnection();
    const userData = new this.connectService.web3.eth.Contract(env.usersAbi, env.usersAddr)
    const accounts = await this.connectService.web3.eth.getAccounts();

    try {
    return  await userData.methods.accountSearch(
        this.connectService.getCreds.platformToken,
        "0",
        [this.tokenService.generateToken(5), this.tokenService.generateToken(5)],
        this.currentlyValidating.account_token
      ).
        call({ from: this.connectService.accounts[0] }).then(
          async (res: any) => {
           
            this.loadService.hideLoader()
            return res;
            

          })
        }
        catch(err:any){
          this.alertService.alert(err.message,"danger")
              this.loadService.hideLoader();
        }
      }

      async getValidationRequest(
        account_token:string
        ) {
      
          this.loadService.Loader("Processing...");
          const web3 = await this.connectService.checkConnection();
          const userData = new this.connectService.web3.eth.Contract(env.recoveryAbi, env.recoveryAddr)
          const accounts = await this.connectService.web3.eth.getAccounts();
      
          try {
          return  await userData.methods.recoveryRequest(
              this.currentlyValidating.account_token
            ).
              call({ from: this.connectService.accounts[0] }).then(
                async (res: any) => {
                 
                  this.loadService.hideLoader()
                  return res;
      
                })
              }
              catch(err:any){
                this.alertService.alert(err.message,"danger")
                    this.loadService.hideLoader();
              }
            }

            async goToReport(){
              if(this.currentlyValidating.account_token==null){
                return;
              }
              localStorage.setItem("currentlyValidating",JSON.stringify(this.currentlyValidating))
              this.router.navigateByUrl("account/validation/report")
            }
}
