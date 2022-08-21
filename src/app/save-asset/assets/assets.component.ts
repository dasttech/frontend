import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { Asset } from 'src/app/models/asset';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { SaveServiceService } from '../save-service.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  tab = 0;
  assetId = 0;
  editing=false;
  asset_title:string = "";
  asset_asset:string = "";
  myAssets:Asset[] = [];

  constructor(
    private saveService:SaveServiceService,
    private connectService:ConnectService,
    private alertService:AlertService,
    private loadService:LoadServiceService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
    await this.saveService.fetchAssets(this.connectService.getCreds.platformToken)
    var assets = await this.saveService.getMyAssets;
    for(var i = 0; i<assets.length; i++){
      this.myAssets.push(new Asset(i+1,assets[i].title,assets[i].asset));
    }
    },1000)
  }

  switchtab(number:number){
    this.tab = number
  }

  async update(){
    if(this.asset_title==""){this.alertService.alert("Enter asset title","danger"); return;}
    if(this.asset_asset==""){this.alertService.alert("Enter the your asset","danger"); return;}

    this.loadService.Loader("Updating assets...");
    const web3 = await this.connectService.checkConnection();
    const editedAsset = new this.connectService.web3.eth.Contract(env.assetsAbi,env.assetsAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
    
  try {    const saveAsset = await editedAsset.methods.editAsset(
      this.connectService.getCreds.platformToken,
      [this.assetId,this.asset_title,this.asset_asset]).
      send({from:this.connectService.accounts[0]}).then(
        (res:any)=>{
        if(res.status){
          this.loadService.hideLoader();
          this.alertService.alert("Asset updated","success")
          setTimeout(() => {
            this.router.navigateByUrl("/account/assets")            
          }, 2000);
        }
        else{
          
          this.loadService.hideLoader();
          this.alertService.alert("Failed to edit asset","danger");
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
      this.router.navigateByUrl("/account/assets")
    }

  }

  async delete(id:number){
    
    this.loadService.Loader("Deleting...");
    const web3 = await this.connectService.checkConnection();
    const targetasset = new this.connectService.web3.eth.Contract(env.assetsAbi,env.assetsAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
    
  try {    const saveAsset = await targetasset.methods.deleteAsset(
      this.connectService.getCreds.platformToken,
     id
     ).
      send({from:this.connectService.accounts[0]}).then(
        (res:any)=>{
        if(res.status){
          this.loadService.hideLoader();
          this.alertService.alert("Asset Deleted","success")
          setTimeout(() => {
            this.router.navigateByUrl("/account/assets")            
          }, 2000);
        }
        else{
          
          this.loadService.hideLoader();
          this.alertService.alert("Failed to delete asset","danger");
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
      this.router.navigateByUrl("/account/assets")
    }
  }

  setId(id:number){
      this.assetId = id;
  }

  viewAsset(id:number){
    this.setId(id);
      this.asset_title = this.myAssets[id].title;
      this.asset_asset = this.myAssets[id].asset;
  }

    toggleEdit(){
      this.editing = !this.editing;
    }
}
