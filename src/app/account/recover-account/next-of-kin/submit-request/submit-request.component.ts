import { Component, OnInit, Input } from '@angular/core';
import { Recoveryrequests } from 'src/app/models/recoveryrequests';
import { CountriesService } from 'src/app/services/countries.service';

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
  ) { }

  ngOnInit(): void {
  }

  async sendRequest(){
    let rRequest = new Recoveryrequests(
      this.requester_name,
      this.requester_country,
      "+"+this.countrycode+this.requester_phone,
      this.requester_email,
      this.relationship,
      this.reason,
      this.account_token,
      this.foundUser[3],
      this.num_of_contacts,
      new Date().getTime()
      );

      console.log(rRequest);
    
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
