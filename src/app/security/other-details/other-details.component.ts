import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./bootstrap.css']
})


export class OtherDetailsComponent implements OnInit{
  title = 'Shalom';

  formModal:any;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  openModal(){
    this.formModal.show()
  }

  doSomething(){
    this.formModal.hide()
  }
}
