import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { TokenService } from 'src/app/services/token.service';
import { environment as env} from 'src/environments/environment.prod';
import { AccountService } from '../../account.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  approval:number = 0;
  comment:string = "";

  constructor(
    private loadService: LoadServiceService,
    private connectService: ConnectService,
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  async saveReport(){
    let data:any = localStorage.getItem("currentlyValidating"||"[]");
    const currentlyValidating = JSON.parse(data);
    if(currentlyValidating.account_token==null){
      this.alertService.alert("Invalid token","danger");
      this.router.navigateByUrl("account/validation");
    }
    const web3 = await this.connectService.checkConnection();
    const recovery = new this.connectService.web3.eth.Contract(env.recoveryAbi, env.recoveryAddr)
    this.loadService.Loader("Loading")
    return await recovery.methods.saveReport(this.connectService.getCreds.platformToken,currentlyValidating.account_token,[
      this.connectService.accounts[0],
        currentlyValidating.index,
        this.comment,
        this.approval 
    ]).
      send({ from: this.connectService.accounts[0] }).
      then((data: any) => {
        this.loadService.hideLoader();
        this.alertService.alert("Success", "success");
        localStorage.removeItem("currentlyValidating");
        this.router.navigateByUrl("account/validation");
      }).catch((err: Error) => {
        this.alertService.alert("Something went wrong", "danger");
        this.loadService.hideLoader();
      })
  }

}
