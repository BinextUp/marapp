import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromocionAppPage } from './promocion-app';

@NgModule({
  declarations: [
    PromocionAppPage,
  ],
  imports: [
    IonicPageModule.forChild(PromocionAppPage),
  ],
})
export class PromocionAppPageModule {}
