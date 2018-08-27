import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarAppPage } from './registrar-app';

@NgModule({
  declarations: [
    RegistrarAppPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarAppPage),
  ],
})
export class RegistrarAppPageModule {}
