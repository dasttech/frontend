import { Component, OnInit } from '@angular/core';
import { LoadServiceService } from './load-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    public loadService: LoadServiceService
    ) { }

  ngOnInit(): void {
  }
}
