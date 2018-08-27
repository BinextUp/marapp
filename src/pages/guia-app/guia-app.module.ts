import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuiaAppPage } from './guia-app';

@NgModule({
  declarations: [
    GuiaAppPage,
  ],
  imports: [
    IonicPageModule.forChild(GuiaAppPage),
  ],
})
export class GuiaAppPageModule {}
