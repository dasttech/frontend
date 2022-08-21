import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { TokenService } from 'src/app/services/token.service';
import { SaveServiceService } from '../../save-service.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

 

  public asset_id:number = 0;
  public asset_title:string = "";
  public asset_asset:string = "";


  constructor(
    public saveService:SaveServiceService,
    private tokenService:TokenService,
    private alertService:AlertService,
    private connectService:ConnectService,
    private loadService:LoadServiceService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  
 

  async save(){
    if(this.asset_title==""){this.alertService.alert("Enter asset title","danger"); return;}
    if(this.asset_asset==""){this.alertService.alert("Enter the your asset","danger"); return;}

    this.loadService.Loader("Saving...");
    const web3 = await this.connectService.checkConnection();
    const newAsset = new this.connectService.web3.eth.Contract(env.assetsAbi,env.assetsAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
    
  try {    const saveAsset = await newAsset.methods.saveAsset(
      this.connectService.getCreds.platformToken,
      [0,this.asset_title,this.asset_asset]).
      send({from:this.connectService.accounts[0]}).then(
        (res:any)=>{
        if(res.status){
          this.loadService.hideLoader();
          this.alertService.alert("Asset saved","success")
          setTimeout(() => {
            this.router.navigateByUrl("/account")            
          }, 2000);
        }
        else{
          
          this.loadService.hideLoader();
          this.alertService.alert("Failed to save asset","danger");
        }
        }
      ).catch((err:Error)=>{
        this.loadService.hideLoader();
        this.alertService.alert(err.message,"danger")
      })
    }
    catch(err){

    }
    finally{
      this.router.navigateByUrl("/account")
    }
  }
}
