import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { Recoveryrequests as rr } from 'src/app/models/recoveryrequests';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { TokenService } from 'src/app/services/token.service';
import { environment as env } from 'src/environments/environment.prod';


@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.scss']
})
export class NextOfKinComponent implements OnInit {
  account_token = "";
  error: string = "";
  otps: any[] = [];
  foundUser:string[] = 
            [
              // "Iyida Clement",
              // "+2347061888492",
              // "iyidaclem@gmail.com",
              // "0xF0115e6f7783a91D1Fd02Ef34f82f59De5892595"
            ];
  tempFoundUser: any;
  recoveryR?:rr;
  isValidated = false;
  page=1;

  constructor(
    private alertService:AlertService,
    private loadService:LoadServiceService,
    private connectService:ConnectService,
    private tokenService:TokenService,
    private router:Router
  ) { }

  ngOnInit(): void {
    setTimeout(async()=>{
      
      try {
          const web3 = await this.connectService.checkConnection();
          const recoveryRequest = new this.connectService.web3.eth.Contract(env.recoveryAbi,env.recoveryAddr)
          const accounts = await  this.connectService.web3.eth.getAccounts();
          const pendingRequest = await recoveryRequest.methods.requestStatus(
          this.connectService.getCreds.platformToken
      ).call({from:accounts[0]}).then((res:any)=>{
          this.recoveryR = res[0];
          this.isValidated = Number(res[0].num_of_validators) == Number(res[0].num_of_contacts);
        
        //  console.log(res)
      })

      } catch (error:any) {
        this.alertService.alert(error.message,"danger");
      }

    },0)
  }

  async searchAccount(){
    this.error = "";
      if(this.account_token==""){
        this.alertService.alert("Enter account token", "danger"); return;
      }else{
        var searchString = this.account_token.trim()
        this.otps =  [this.tokenService.generateToken(5),this.tokenService.generateToken(5)];
  
      
      
        this.loadService.Loader("Processing...");
        const web3 = await this.connectService.checkConnection();
        const userData = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
        const accounts = await  this.connectService.web3.eth.getAccounts();
        
      try {    
        const searchAsset = await userData.methods.accountSearch(
          this.connectService.getCreds.platformToken,
          "0",
          [this.otps[0],this.otps[1]],
         searchString.trim()
         ).
          call({from:this.connectService.accounts[0]}).then(
           async  (res:any)=>{
                           
                if(res[0]==''){
                  this.loadService.hideLoader();
                  this.error="User not found"
                }
                else{
                    this.tempFoundUser = res;
                  const searchAsset = await userData.methods.accountSearch(
                    this.connectService.getCreds.platformToken,
                    "0",
                    [this.otps[0],this.otps[1]],
                   searchString.trim()
                   ).
                    send({from:this.connectService.accounts[0]}).then(
                      (res2:any)=>{
                        if(res2.status){
                          this.foundUser = this.tempFoundUser[0];
                           this.loadService.hideLoader();
                        }
                      }).catch((err:any)=>{
                        this.loadService.hideLoader();
                        this.alertService.alert(err.message,"danger")
                      })
                }
  
            }
          ).catch((err:Error)=>{
            this.loadService.hideLoader();
            this.alertService.alert(err.message,"danger")
          })
        }
        catch(err:any){
      console.log(err);
          this.loadService.hideLoader();
          this.alertService.alert(err.message,"danger")
        }
        finally{
          // this.router.navigateByUrl("/account/assets")
          
        }
      }
      
      }

      async recoverAccount(){
        try {
        if(this.recoveryR?.account_address==null){
          return;
        }
        
          this.loadService.Loader("Wait...")
          const web3 = await this.connectService.checkConnection();
          const recoveryRequest = new this.connectService.web3.eth.Contract(env.recoveryAbi,env.recoveryAddr)
          const accounts = await  this.connectService.web3.eth.getAccounts();
          const pendingRequest = await recoveryRequest.methods.recoverAccount(
          this.connectService.getCreds.platformToken,
          this.recoveryR.account_address
      ).send({from:accounts[0]}).then((res:any)=>{
        this.loadService.hideLoader()
          this.recoveryR = res[0];
         this.alertService.alert("Account recovery successful","success");
         this.router.navigateByUrl("account");

      })

      } catch (error:any) {
        
        this.loadService.hideLoader()
        this.alertService.alert(error.message,"danger");
      }

      }

}
