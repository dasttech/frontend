import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment.prod';


import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HandleError } from '../errors/handle-error';
import { WelcomeMessage } from '../models/welcome-message';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http:HttpClient,
    private connectService:ConnectService
  ) { }

  /** POST: add a new hero to the database */
sendWelcome(welcome: WelcomeMessage) {
  return this.http.post(env.apiUrl, {...welcome,token:this.connectService.getCreds.apiToken});
}

sendSMS(
  phone:string, 
  message:string):Observable<any>{
      return this.http.post<any>(env.apiUrl+"/sendsms",{
        recipient:phone,
        message:message,
        token:this.connectService.getCreds.apiToken
      })
   
    
  }

sendMail(
        subject:string, 
        body:string,
        sender_email:string, 
        sender_name:string,
        reciever_email:string, 
        reciever_name:string,
        view:string, 
        token:string,
        ):Observable<any>{
            return this.http.post<any>(env.apiUrl+"/sendmail",{
              subject:subject,
              body:body,
              sender_email:sender_email,
              sender_name:sender_name,
              reciever_email:reciever_email,
              reciever_name:reciever_name,
              view:view,
              token:this.connectService.getCreds.apiToken
      
            })
      }

      subscribe(
        title:string, 
        body:string,
        email:string, 
        name:string
        ):Observable<any>{
            return this.http.post<any>(env.apiUrl+"/subscribe",{
              title:title,
              body:body,
              email:email,
              name:name,
              token:this.connectService.getCreds.apiToken
      
            })
      }

}
