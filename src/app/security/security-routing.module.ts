import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtherDetailsComponent } from './other-details/other-details.component';
import { AssetDetailsComponent } from '../security/asset-details/asset-details.component';

const routes: Routes = [
    { path: 'otherDetails', component: OtherDetailsComponent},
    { path: 'assetDetails', component: AssetDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }