import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
// import { AboutComponent } from './about/about.component';
// import { RoadmapComponent } from './roadmap/roadmap.component';
// import { WhitePaperComponent } from './white-paper/white-paper.component';
// import { VideoComponent } from './video/video.component';
import { StrategyComponent } from './strategy/strategy.component';
import { FooterComponent } from './footer/footer.component';
// import { SecurityComponent } from './security/security.component';
import { SaveAssetComponent } from './security/save-asset/save-asset.component';
import { AppRoutingModule } from '../app-routing.module';
import { RoutingComponents } from '../app-routing.module';
import { MainComponent } from './main/main.component';
import { OtherDetailsComponent } from './security/other-details/other-details.component';
import { AssetDetailsComponent } from './security/asset-details/asset-details.component';
import { SecurityRoutingModule } from './security/security-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    // AboutComponent,
    // RoadmapComponent,
    // WhitePaperComponent,
    // VideoComponent,
    StrategyComponent,
    FooterComponent,
    // SecurityComponent,
    SaveAssetComponent,
    RoutingComponents,
    MainComponent,
    OtherDetailsComponent,
    AssetDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
