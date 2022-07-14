import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SecurityRoutingModule } from './security-routing.module';
import { RoutingComponents } from '../../../src/app-routing.module';
import { AssetDetailsComponent } from '../security/asset-details/asset-details.component';
import { OtherDetailsComponent } from './other-details/other-details.component';
import { RecoverAssetComponent } from './recover-asset/recover-asset.component';

@NgModule({
  declarations: [
    RoutingComponents,
    AssetDetailsComponent,
    OtherDetailsComponent,
    RecoverAssetComponent
  ],
  imports: [
    BrowserModule,
    SecurityRoutingModule,
  ],
  providers: [],
})
export class SecurityModule { }
