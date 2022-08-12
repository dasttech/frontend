import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment.prod';
import { LoadServiceService } from '../loading/load-service.service';
import { Asset } from '../models/asset';
import { Contact } from '../models/contact';
import { AlertService } from '../services/alert.service';
import { ConnectService } from '../services/connect.service';


@Injectable({
  providedIn: 'root'
})
export class SaveServiceService {
 
  myAccount: any;
  nextOfKin: any;
  tContacts: any;
  myAssets:Asset[] = [];


  constructor(
    private alertService:AlertService,
    private connectService:ConnectService,
    private loadService:LoadServiceService
  ) {}

 
  async fetchAssets(platformToken:string){
    const web3 = await this.connectService.checkConnection();
    const assets = new this.connectService.web3.eth.Contract(env.assetsAbi,env.assetsAddr)
    await assets.methods.fetchAsset(platformToken).call({from:this.connectService.accounts[0]}).then((data:any)=>{
      
      this.myAssets = data;
      
      this.loadService.hideLoader();
     
    }).catch((err:Error)=>{
   
      this.loadService.hideLoader();
    })
  }

  get getMyAssets(){
    return this.myAssets;
  }

}
