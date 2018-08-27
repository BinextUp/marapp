import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MiPerfilMapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mi-perfil-mapa',
  templateUrl: 'mi-perfil-mapa.html',
})
export class MiPerfilMapaPage {
  json : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  public viewCtrl: ViewController) {

    this.json=navParams.data.datos;
    console.log(this.json);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiPerfilMapaPage');
  }


  cerrar_ventana(){
    this.viewCtrl.dismiss({retornar:"ventana"});

  }

  coordenada(jsonn){
    this.viewCtrl.dismiss({retornar:jsonn})
  }

}
