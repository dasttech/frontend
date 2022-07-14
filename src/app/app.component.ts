import { Component, OnInit} from '@angular/core';
import { from, of } from 'rxjs';
import { WelcomeMessage } from './models/welcome-message';
import { AlertService } from './services/alert.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dastfront';
  constructor(
    private message:MessageService,
    private alertService:AlertService
    
  ){}

  ngOnInit(){
   
  }
}
