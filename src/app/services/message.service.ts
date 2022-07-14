import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';


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
  return this.http.post(this.connectService.getCreds.apiUrl, {...welcome,token:this.connectService.getCreds.apiToken});
}

}
