import { Component, OnInit, Input } from '@angular/core';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { Recoveryrequests as rr } from 'src/app/models/recoveryrequests';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.scss']
})
export class SubmitRequestComponent implements OnInit {
  error = ""
  @Input() foundUser:string[] =[]
  searchText = ""
  requester_name?:string
  requester_country?:string
  requester_phone?:string
  requester_email?:string
  relationship?:string
  reason?:string
  @Input() account_token?:string
  account_address?:string
  num_of_contacts?:number
  request_date?:string
  form_count:number = 0;
  field_count:number = 4;

  constructor(
    public countries:CountriesService,
    private connectService:ConnectService,
    private alertService:AlertService,
    private loadService:LoadServiceService
  ) { }

  ngOnInit(): void {
    setTimeout(async()=>{
      
      try {
        
          const web3 = await this.connectService.checkConnection();
          const contactCount = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
          const accounts = await  this.connectService.web3.eth.getAccounts();
          const pendingRequest = await contactCount.methods.contactCount(
          this.foundUser[3]
      ).call({from:accounts[0]}).then((res:any)=>{
          this.num_of_contacts = res;
      })

      } catch (error:any) {
        this.alertService.alert(error.message,"danger");
      }

    },0)
  }

  async sendRequest(){

    this.loadService.Loader("Proccessing...")
    let rRequest = new rr(
      this.requester_name,
      this.requester_country,
      this.countrycode+this.requester_phone,
      this.requester_email,
      this.relationship,
      this.reason,
      this.account_token,
      this.foundUser[3],
      this.num_of_contacts,
      new Date().getTime()
      );

     if(!this.num_of_contacts||this.num_of_contacts<3){
        this.alertService.alert("Sorry the owner of this asset didn't add trusted contact. We will not be able to validate your request","danger");
       
        return this.loadService.hideLoader();
     }

     
     try {
        
      const web3 = await this.connectService.checkConnection();
      const newRequest = new this.connectService.web3.eth.Contract(env.recoveryAbi,env.recoveryAddr)
      const accounts = await  this.connectService.web3.eth.getAccounts();
      const pendingRequest = await newRequest.methods.saveRequest (
        this.connectService.getCreds.platformToken,
        rRequest

  ).send({from:accounts[0]}).then((res:any)=>{
      this.num_of_contacts = res;
      this.loadService.hideLoader()
  })

  } catch (error:any) {
    this.loadService.hideLoader();
    this.alertService.alert(error.message,"danger");
    

  }
    
  }

  prev(){
    this.form_count--;
  }

  
  next(){
    this.form_count++;
  }

  get countrycode(){
    if(!this.requester_country){return "+" }
    try {
     return this.requester_country.split(",",3)[2];
    } catch (error) {
     return ""
    }
   }
}
