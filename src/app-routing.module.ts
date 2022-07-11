import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './app/about/about.component';
import { RoadmapComponent } from './app/roadmap/roadmap.component';
import { WhitePaperComponent } from './app/white-paper/white-paper.component';
import { SecurityComponent } from './app/security/security.component';
import { VideoComponent } from './app/video/video.component';
import { SaveAssetComponent } from './app/save-asset/save-asset.component';
import { MainComponent } from './app/main/main.component';
import { AccountComponent } from './app/account/account.component';
import { AccountFormComponent } from './app/account/account-form/account-form.component';



const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'about', component: AboutComponent},
  { path: 'roadmap', component: RoadmapComponent},
  { path: 'security', component: SecurityComponent},
  { path: 'whitepaper', component: WhitePaperComponent},
  { path: 'video', component: VideoComponent},
  { path: 'saveAsset', component: SaveAssetComponent},
  { path: 'account', component: AccountComponent},
  { path: 'account/form', component: AccountFormComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  AboutComponent,
  RoadmapComponent,
  SecurityComponent,
  WhitePaperComponent,
  VideoComponent,
  SaveAssetComponent
]
