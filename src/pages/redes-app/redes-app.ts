import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-redes-app',
  templateUrl: 'redes-app.html',
})
export class RedesAppPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  goBack():void{
  	this.navCtrl.pop();
  }

}
