import { Injectable } from '@angular/core';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  accounts:string[] = [];
  isConnected = false;
  connectedAccount = "";

  web3:Web3 = new Web3('http://localhost:7545');

  provider:any;


  constructor() {

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
          infuraId: "INFURA_ID" // required
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
    {cacheProvider: false, 
      providerOptions,
      });
  
  this.provider = await web3Modal.connect();
  
  this.web3 = new Web3(this.provider);
}


async checkConnection(){
 try {
 this.accounts =await this.web3.eth.getAccounts();
 } catch (error) {
  console.log("Something went wrong")
 }
 if(this.accounts.length>0){
    this.isConnected = true;
    this.connectedAccount = this.accounts[0].substring(0,3)+".."+this.accounts[0].substring(this.accounts.length-4,this.accounts.length-1);
  }
}


   


}
