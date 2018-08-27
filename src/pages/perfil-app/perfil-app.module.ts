import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilAppPage } from './perfil-app';

@NgModule({
  declarations: [
    PerfilAppPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilAppPage),
  ],
})
export class PerfilAppPageModule {}
