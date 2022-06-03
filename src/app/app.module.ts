import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { VideoComponent } from './video/video.component';
import { StrategyComponent } from './strategy/strategy.component';
import { FooterComponent } from './footer/footer.component';
=======
import { HeaderComponent } from './header/header.component';
>>>>>>> 707151d64471775a22feaa2874c0b9a29114ecdd

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    RoadmapComponent,
    WhitePaperComponent,
    VideoComponent,
    StrategyComponent,
    FooterComponent
=======
    HeaderComponent
>>>>>>> 707151d64471775a22feaa2874c0b9a29114ecdd
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
