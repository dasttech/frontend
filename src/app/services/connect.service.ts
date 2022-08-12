import { Injectable } from '@angular/core';
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from "web3";
import Web3Modal from "web3modal";
import { AlertService } from './alert.service';
import { AbiItem } from 'web3-utils';
import { environment as env } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  public accounts:string[] = [];
  isConnected = false;
  connectedAccount = "";
  showLoader = false;
  public web3 = new Web3();
  private creds = {
    platformToken:"1234567890",
    apiToken:"mytoken123",

    infuraId: env.infura_id

  }

 
  constructor(
    private alertService:AlertService
  ) {
  }

  async connect(){
    
    const providerOptions ={ 
      binancechainwallet: {
        package: true
      },
      walletconnect: {
        // display: {
        //   name: "Mobile"
        // },
        package: WalletConnectProvider,
        options: {
          infuraId:this.getCreds.infuraId,
          rpc: {
            1: `https://mainnet.infura.io/v3/${this.getCreds.infuraId}`,
            3: `https://ropsten.infura.io/v3/${this.getCreds.infuraId}`,
            100: `https://dai.poa.network`,
            56: `https://bsc-dataseed.binance.org/`,
            97: `https://data-seed-prebsc-1-s1.binance.org:8545/`
          },
        }
      
      }
     
    }
  const web3Modal = new Web3Modal(
    {
      cacheProvider: false, 
      disableInjectedProvider:false,
      providerOptions: providerOptions,

      });
  
      web3Modal.clearCachedProvider();
      let  provider = await web3Modal.connect();
      this.web3 = new Web3(provider);
      const chainId = await this.web3.eth.net.getId();
  
      if(chainId!==env.chainId){
        
        await provider.disconnect()
        this.alertService.alert("Unsupported network", "danger");
        return;
      
      }
      else {
    // this.web3 = web3;
    // return web3;
      }
      // Subscribe to accounts change
provider.on("accountsChanged", (accounts: string[]) => {
  this.accounts = accounts;
  this.isConnected = false
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId: number) => {
  this.isConnected = false;
  this.checkConnection();
});


// Subscribe to provider disconnection
provider.on("disconnect", (error: { code: number; message: string }) => {
 this.isConnected = false;

});

return this.web3;
}


async checkConnection(){
 try {
  if(this.isConnected){return}
  await this.connect();
 this.accounts =await this.web3.eth.getAccounts();
 } catch (error) {
  console.log(error)
  this.alertService.alert("Connection failed! Make sure your are connected to the right network","danger")
 }
 if(this.accounts.length>0){
    this.isConnected = true;
    this.connectedAccount = this.accounts[0].substring(0,3)+".."+this.accounts[0].substring(this.accounts.length-4,this.accounts.length-1);
  }
}

get getCreds(){
  return {...this.creds}
}

togglerLoader(){
  this.showLoader = !this.showLoader;
}



}
