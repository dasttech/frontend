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
          infuraId:"eiieiei",
          // rpc: {
          //   1: "https://mainnet.mycustomnode.com",
          //   3: "https://ropsten.mycustomnode.com",
          //   100: "https://dai.poa.network",
          //   // ...
          // },
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
        await this.swichNetwork(this.creds.chainId)
       .then(async res=>{
        if(res.code&&res.code=="4902"){
          this.alertService.alert("Your network is not supported. Try connecting to BSC network","danger");
          this.web3 = new Web3();
        }
        else{
       provider = await web3Modal.connect();
       this.web3 = new Web3(provider);
        // this.web3 = web3;
        // return web3;
        }
       }).catch(e=>{
        this.alertService.alert(e.message,"danger")
        this.web3 =  new Web3();
       })
      
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


//Switch network
swichNetwork = async (chainId:any) => {

  
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        })
    } catch (switchError:any) {
      return switchError
    
    }
}

}
