import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroBookPage } from './registro-book';

@NgModule({
  declarations: [
    RegistroBookPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroBookPage),
  ],
})
export class RegistroBookPageModule {}
