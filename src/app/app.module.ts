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
// import { SaveAssetComponent } from './save-asset/save-asset.component';
import { AppRoutingModule } from '../app-routing.module';
import { RoutingComponents } from '../app-routing.module';
import { MainComponent } from './main/main.component';
import { ViewSavedAssetsComponent } from './view-saved-assets/view-saved-assets.component';
import { RecoverAssetPageComponent } from './recover-asset-page/recover-asset-page.component';

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
    // SaveAssetComponent,
    RoutingComponents,
    MainComponent,
    ViewSavedAssetsComponent,
    RecoverAssetPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
