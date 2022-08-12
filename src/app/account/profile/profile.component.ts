import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadServiceService } from 'src/app/loading/load-service.service';
import { Contact } from 'src/app/models/contact';
import { NextOfKin } from 'src/app/models/nextofkin';
import { AlertService } from 'src/app/services/alert.service';
import { ConnectService } from 'src/app/services/connect.service';
import { CountriesService } from 'src/app/services/countries.service';
import { AccountService } from '../account.service';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    
  showsidebar = false;
  tabIndex = 0;
  isloading = false;
  show_account_token=false;

  id:string = "";
  wallet_addr:string = "";
  fullname:string = "";
  avatar:string = "";
  email:string = "";
  phone:string = "";
  country:string = "";
  street_address:string = "";
  others:string = "{}";
  account_token = "";

  nkin_id:number =  0;
  nkin_name:string =  '';
  nkin_email:string =  '';
  nkin_phone:string =  '';
  nkin_country:string =  '';
  nkin_relationship:string =  '';

  
  public contacts:Contact[] |undefined = [];

  
  constructor(
    private accountService:AccountService,
    private router:Router,
    private connectService:ConnectService,
    public countries:CountriesService,
    private alertService:AlertService,
    private loadService:LoadServiceService

  ) { }

  ngOnInit(): void {
    if(!this.accountService.isloaded){
      // this.router.navigateByUrl("/account")
    }
    
     this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
    this.id = this.accountService.getUser.id;
    this.wallet_addr = this.accountService.getUser.wallet_addr;
    this.fullname = this.accountService.getUser.fullname;
    this.avatar = this.accountService.getUser.avatar;
    this.email = this.accountService.getUser.email;
    this.phone = this.accountService.getUser.phone.split("-",2)[1];
    this.country = this.accountService.getUser.country;
    this.street_address = this.accountService.getUser.street_address;
    this.others = this.accountService.getUser.others;
    this.account_token = this.accountService.getUser.account_token;

    // next of kin
    this.nkin_id = this.accountService.getNkin.id;
    this.nkin_name = this.accountService.getNkin.name;
    this.nkin_email = this.accountService.getNkin.email;
    this.nkin_phone = this.accountService.getNkin.phone.split("-",2)[1];
    this.nkin_country = this.accountService.getNkin.country;
    this.nkin_relationship = this.accountService.getNkin.relationship;

    //tContacts
   var tcontact = this.accountService.getTContact
   for (var i = 0; i<tcontact.length; i++){
    this.contacts?.push(new Contact(i+1,tcontact[i].name,tcontact[i].email,tcontact[i].phone,tcontact[i].country,tcontact[i].relationship))
   }
    
  }

  get getUser(){
    return this.accountService.getUser;
  }
  get countrycode(){
    return this.country.split(",",3)[2]
  }

  get nkincountrycode(){
    return this.nkin_country.split(",",3)[2]
  }

  get mycountry(){
    return this.country.split(',',3);

  }

  toggleSideBar(){
    this.showsidebar =!this.showsidebar;
    const doc = document.querySelector("*,* ul,* li") as HTMLElement;

    doc.addEventListener("click",()=>{
      this.showsidebar = !this.showsidebar;
      this.showsidebar = !this.showsidebar;
    })
  }

  switchTab(index:number){
    this.tabIndex = index;
  }

  async saveBio(){
    this.isloading = !this.isloading;

    if(this.fullname==""){this.alertService.alert("Enter full name", "danger"); this.isloading = false; return}
    if(this.country==""){this.alertService.alert("Choose country", "danger"); this.isloading = false; return}
    if(this.street_address==""){this.alertService.alert("Enter street address", "danger"); this.isloading = false; return}

    this.loadService.Loader()
    const web3 = await this.connectService.checkConnection();
    const editedUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
   try{
    await editedUser.methods.editAccount(
        this.connectService.getCreds.platformToken,
       
         [ 
        "0",
         accounts[0],
         `${Math.ceil(Math.random()*100000)}`,
         this.fullname,
         "",
         this.email,
         this.phone.toString(),
         this.country,
         this.street_address,
         Math.ceil(Math.random()*100000),
         this.others,
         ]
      
      ).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account updated successfully",
      "Success");
    this.loadService.hideLoader();
    this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
    
   }
   else{
    this.alertService.alert("Account updated failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed.","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
  
}finally{
  this.isloading=false
}

  }

  async saveContact(){
    this.isloading = !this.isloading;

    if(this.email==""){this.alertService.alert("Enter your email address", "danger"); this.isloading = false; return}
    if(this.phone==""){this.alertService.alert("Enter phone number", "danger"); this.isloading = false; return}
    this.loadService.Loader()
    const web3 = await this.connectService.checkConnection();
    const editedUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
   try{
    await editedUser.methods.updateContacts(
        this.connectService.getCreds.platformToken,
        this.email.trim(),
        this.countrycode+"-"+this.phone
      
      ).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account updated successfully",
      "Success");
    this.loadService.hideLoader();
    this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
    
   }
   else{
    this.alertService.alert("Account updated failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed.","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
  
}finally{
  this.isloading=false
}

  }



  async saveTContact(){
    this.isloading = !this.isloading;
    if(!this.contacts){return}
    if(this.contacts?.length<3){this.alertService.alert("Add minimum of 3 trusted contacts", "danger"); this.isloading = false; return}
    this.loadService.Loader()
    const web3 = await this.connectService.checkConnection();
    const editedUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
   try{
    await editedUser.methods.addContact(
        this.connectService.getCreds.platformToken,
       this.contacts
      
      ).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account updated successfully",
      "Success");
    this.loadService.hideLoader();
    this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
    
   }
   else{
    this.alertService.alert("Account updated failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed.","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
  
}finally{
  this.isloading=false
}

  }


  async addNextOfKin(){
    this.isloading = !this.isloading;

    
    if(this.nkin_name==""){this.alertService.alert("Enter next of kin name", "danger"); this.isloading = false; return}
    if(this.nkin_email==""){this.alertService.alert("Enter next of kin email", "danger"); this.isloading = false; return} 
    if(this.nkin_phone==null){this.alertService.alert("Enter next of kin phone number", "danger"); this.isloading = false; return} 
    if(this.nkin_country==""){this.alertService.alert("Enter next of kin country", "danger"); this.isloading = false; return} 
    if(this.nkin_relationship==""){this.alertService.alert("Enter your relationship with the next of kin", "danger"); this.isloading = false; return}  

    this.loadService.Loader()

    const web3 = await this.connectService.checkConnection();
    const editedUser = new this.connectService.web3.eth.Contract(env.usersAbi,env.usersAddr)
    const accounts = await  this.connectService.web3.eth.getAccounts();
   try{
    await editedUser.methods.addNextOfKin(
        this.connectService.getCreds.platformToken,
       new NextOfKin(
        this.nkin_id,
        this.nkin_name,
        this.nkin_email,
        this.nkincountrycode+"-"+this.nkin_phone,
        this.nkin_country,
        this.nkin_relationship
       )
      
      ).send({from: accounts[0]})
  .then(
  async(res:any)=>{
   if(res.status){
    this.alertService.alert("Account updated successfully",
      "Success");
    this.loadService.hideLoader();
    this.accountService.fetchUserData(this.connectService.getCreds.platformToken);
    
   }
   else{
    this.alertService.alert("Account updated failed",
      "danger");
    this.loadService.hideLoader();
   }
  }).catch((err:Error) => {
     this.alertService.alert("Transaction failed.","danger");
    this.loadService.hideLoader();
  });
  
 
}catch (e: any) { 
  if (typeof e === "string") {
    
    this.alertService.alert(e,"danger");
    this.loadService.hideLoader();
  } else if (e) {
    this.alertService.alert(e.message,"danger");
    this.loadService.hideLoader();
  }
  
}finally{
  this.isloading=false
}

  }


}
