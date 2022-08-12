import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { from } from 'rxjs';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss']
})
export class RecoveryPageComponent implements OnInit {

searchType:number = 0;
searchText = "";
country:string = "";
foundUser:string[] = [];
tempFoundUser:string[] = [];
stage = "search"
error = "";
otps:string[] = [];
email_pin = "";
sms_pin = "";
resend_counter:number = 60;

  constructor(
    private connectService:ConnectService,
    private alertService: AlertService,
    public countries:CountriesService,
    private loadService:LoadServiceService,  
    private tokenService:TokenService,
    private router:Router,
    private messageService:MessageService

  ) { }

  ngOnInit(): void {

    setInterval(()=>{
      if(this.resend_counter>0){
        this.resend_counter--;
      }
    },1000)
  }

  get countrycode(){
    try {
     return this.country.split(",",3)[2];
    } catch (error) {
     return ""
    }
   }
 
   get mycountry(){
     return this.country.split(',',3);
 
   }

  async searchAccount(){
  this.error = "";
    if(this.searchText==""){
      if(this.searchType==0&&this.searchText==""){this.alertService.alert("Enter account token", "danger"); return;}
      if(this.searchType==1&&this.searchText==""){this.alertService.alert("Enter account email", "danger"); return;}
      if(this.searchType==2&&this.country==""){this.alertService.alert("Choose your country please", "danger"); return;}
      if(this.searchType==2&&this.searchText==""){this.alertService.alert("Enter account phone number", "danger"); return;}
    }else{
      var searchString = this.searchText
      this.otps =  [this.tokenService.generateToken(5),this.tokenService.generateToken(5)];
      if(this.searchType==2){searchString = this.countrycode+"-"+this.searchText}

    
    
      this.loadService.Loader();
      const web3 = await this.connectService.checkConnection();
      const userData = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
      const accounts = await  this.connectService.web3.eth.getAccounts();
      
    try {    
      const saveAsset = await userData.methods.accountSearch(
        this.connectService.getCreds.platformToken,
        this.searchType,
        [this.otps[0],this.otps[1]],
       searchString.trim()
       ).
        call({from:this.connectService.accounts[0]}).then(
         async  (res:any)=>{
                         
              if(res[0]==''){
                this.loadService.hideLoader();
                this.error="User not found"
                this.foundUser = res;}
              else{
                  this.tempFoundUser = res;
                const saveAsset = await userData.methods.accountSearch(
                  this.connectService.getCreds.platformToken,
                  this.searchType,
                  [this.otps[0],this.otps[1]],
                 searchString.trim()
                 ).
                  send({from:this.connectService.accounts[0]}).then(
                    (res2:any)=>{
                      if(res2.status){
                        this.foundUser = this.tempFoundUser;
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
        if(this.email_pin==""){this.alertService.alert("Enter email pin", "danger"); return;}
        if(this.sms_pin==""){this.alertService.alert("Enter sms pin", "danger"); return;}
        
        this.loadService.Loader();
        const web3 = await this.connectService.checkConnection();
        const userData = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
        const accounts = await  this.connectService.web3.eth.getAccounts();
        
      try {    const saveAsset = await userData.methods.recoverAccount(
          this.connectService.getCreds.platformToken,
         this.foundUser[3].toString(),
         [this.email_pin,this.sms_pin]
         ).
          send({from:this.connectService.accounts[0]}).then(
            (res:any)=>{
              if(res.status){
                this.loadService.hideLoader();
              }
              else{
                this.alertService.alert(res,"danger");
                console.log(res)
                return;
              }
  
            }
          ).catch((err:Error)=>{
            this.loadService.hideLoader();
            console.log(err.message)
            this.alertService.alert(err.message,"danger")
          })
        }
        catch(err:any){
    this.loadService.hideLoader();
            console.log(err.message)
            this.alertService.alert(err.message,"danger")
        }
        finally{
          this.router.navigateByUrl("/account/recovery/search")
        }
      }
      
      async sendPins(){
        // try {
          this.stage='otp';
          this.resend_counter = 60;

          var  phone:any = this.foundUser[1].split("-",2);
              phone = `+${phone[0]}${phone[1]}`;
           this.messageService.
          sendSMS(phone,`Dear ${this.foundUser[0]}, your recovery pin is ${this.otps[1]}`).
          subscribe({
            error:data=>{
             console.log(data)
            },
            next:data=>{console.log(data);}
          }
            
          );
          
          this.messageService.sendMail(
            "Recovery Pin",
            `Dear ${this.foundUser[0]}, your recovery pin is ${this.otps[0]}`,
            "admin@dast.tech",
            "DAST",
            this.foundUser[2],
            this.foundUser[0],
            "recovery",
            this.connectService.getCreds.apiToken
          ).subscribe(
            {
              error:data=>{
                console.log(data);
              },
              next:(data)=>{console.log(data)}
            }
            
          );

        // } catch (error:any) {
        //   console.log(error);
        // }
        // finally{
          
        // }
        
      }



  
}
