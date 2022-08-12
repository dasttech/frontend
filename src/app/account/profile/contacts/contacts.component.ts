import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { AlertService } from 'src/app/services/alert.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() contacts:Contact[] | undefined;

  public contact_name:string = "";
  public contact_email:string = "";
  public contact_phone:string = "";
  public country:string = "";
  public contact_relationship:string = "";
  public alertMessage:string = "";
  constructor(
    public countries:CountriesService,
    private alertServie:AlertService
  ) { }

  ngOnInit(): void {
  }

  deleteContact(i:number){
    if(this.contacts){
      for(var j = i; j<this.contacts.length-1; j++){
          this.contacts[j] =this.contacts[j+1];
      }
    }
    this.contacts?.pop();

    }
    get countrycode(){
      try {
        
      return this.country.split(",",3)[2]

      } catch (error) {
        return "";
      }
    }
  
    get mycountry(){
      return this.country.split(',',3);
  
    }

    setAlertMessage(message:string){
      this.alertMessage = message;
      setTimeout(()=>{this.alertMessage = "";},3000)
    }

    async save(){
      const reset = document.querySelector(".reset_btn") as HTMLElement;
      const close = document.querySelector(".close_btn") as HTMLElement;

      
      if(this.contact_name==""){this.setAlertMessage("Enter contact\'s name"); return;}
      if(this.contact_email==""){this.setAlertMessage("Enter contact\'s email"); return;}
      if(this.contact_phone==""){this.setAlertMessage("Enter contact\'s phone"); return;}
      if(this.country==""){this.setAlertMessage("Enter contact\'s country"); return;}
      if(this.contact_relationship==""){this.setAlertMessage("Enter your relationship with the contact"); return;}

    if(this.contacts){
      for(var i = 0; i<this.contacts?.length;i++){
        if(this.contact_email== this.contacts[i].email){
          this.setAlertMessage("Email already added");
          return; 
        }
        if(this.country.split(",",3)[2]+"-"+this.contact_phone== this.contacts[i].phone){
          this.setAlertMessage("Phone number already added");
          return; 
        }
      }
    }

        this.contacts?.push(new Contact(this.contacts.length+1,this.contact_name,this.contact_email,this.country.split(",",3)[2]+"-"+this.contact_phone,this.country.split(",",3)[1],this.contact_relationship));
    
    setTimeout(()=>{
      if(close&&reset){
        close.click();
        reset.click();
      }
    },500)
            
    }
  
  }
