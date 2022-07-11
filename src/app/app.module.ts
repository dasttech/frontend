import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { AccountComponent } from './account/account.component';
import { LoadingComponent } from './loading/loading.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AccountFormComponent } from './account/account-form/account-form.component';

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
    RecoverAssetPageComponent,
    AccountComponent,
    LoadingComponent,
    AccountDetailComponent,
    CreateAccountComponent,
    AccountFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
