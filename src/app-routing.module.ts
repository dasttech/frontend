import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './app/about/about.component';
import { RoadmapComponent } from './app/roadmap/roadmap.component';
import { WhitePaperComponent } from './app/white-paper/white-paper.component';
import { SecurityComponent } from './app/security/security.component';
import { VideoComponent } from './app/video/video.component';
import { MainComponent } from './app/main/main.component';
import { SaveAssetComponent } from './app/security/save-asset/save-asset.component';

import { OtherDetailsComponent } from './app/security/other-details/other-details.component';
import { AssetDetailsComponent } from './app/security/asset-details/asset-details.component';
import { ViewAssetComponent } from './app/security/view-asset/view-asset.component';
import { RecoverAssetComponent } from './app/security/recover-asset/recover-asset.component';


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'about', component: AboutComponent},
  { path: 'roadmap', component: RoadmapComponent},
  { path: 'security', component: SecurityComponent,},
  { path: 'whitepaper', component: WhitePaperComponent},
  { path: 'video', component: VideoComponent},
  { path: 'saveAsset', component: SaveAssetComponent,
      children: [
        { path: '', component: AssetDetailsComponent},
        { path: 'otherDetails', component: OtherDetailsComponent},
        { path: 'assetDetails', component: AssetDetailsComponent},
      ]
  },
  { path: 'viewAsset', component: ViewAssetComponent},
  { path: 'recoverAsset', component: RecoverAssetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  AboutComponent,
  RoadmapComponent,
  SecurityComponent,
  WhitePaperComponent,
  VideoComponent,
]
