import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  video = 'https://dast.tech/videos/dast.mp4';
  preview = 'assets/images/Video Player Container.png'

}
