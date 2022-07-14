import { Injectable } from '@angular/core';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Users from "artifacts/contracts/Users/Users.sol/Users.json"
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json"
import { AlertService } from './alert.service';
import { AbiItem } from 'web3-utils';


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
    auth:"0x5001A69809d9C7B5A7357b46C2ea65D84D5ABf1C",
    users:"0x3E9C1efCe66B88e05aa803B33604251eF45B69BF",
    usersAbi: Users.abi as AbiItem[],
    AuthAbi : Auth.abi as AbiItem[],
    chainId:3,

    apiUrl:"http://localhost:8000/api/sendmail",
    emailBanner:"",
    apiToken:"H6JK5XKdcTOZZqVHvHZaOog2mGqXwEq56"

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
          infuraId:"01cee0da686f45b284603965699bac60",
          rpc: {
            1: "https://mainnet.infura.io/v3/01cee0da686f45b284603965699bac60",
            3: "https://ropsten.infura.io/v3/01cee0da686f45b284603965699bac60",
            100: "https://dai.poa.network",
            56: "https://bsc-dataseed.binance.org/",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
          },
        }
      
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, 
        options: {
          appName: "Web 3 Modal Demo",
          infuraId: "process.env.INFURA_KEY "
        },
        
      
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
  
      if(chainId!==this.creds.chainId){
        
        await provider.disconnect()
        this.alertService.alert("Unsupported network", "danger");
      
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
  this.alertService.alert("Something went wrong","danger")
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
