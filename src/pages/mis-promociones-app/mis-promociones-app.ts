import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//import {HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { PerfilAppPage } from '../perfil-app/perfil-app';
import {CambioContrasenaPage} from '../cambio-contrasena/cambio-contrasena';


@IonicPage()
@Component({
  selector: 'page-mis-promociones-app',
  templateUrl: 'mis-promociones-app.html',
})
export class MisPromocionesAppPage {
  data_usuario:any;
  my_promociones:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public alertCtrl: AlertController, 
  	public network : ProviderAppProvider,
  	public modalCtrl : ModalController) {
    this.data_usuario=navParams.data.data_usuario;    
    
    console.error(this.data_usuario);
    this.mis_promociones();
    
  }

  cambio_contrasena():void{
    let  modal= this.modalCtrl.create(CambioContrasenaPage, {data_usuario:this.data_usuario});    
    modal.present();
    modal.onDidDismiss(data => console.log(data));
    
    //this.navCtrl.push(CambioContrasenaPage, {arreglo:this.data_usuario});
  }

  editar_perfil():void{

    this.navCtrl.push(PerfilAppPage , {usua:this.data_usuario});
  }

  mis_promociones(){
    
    this.network.cargar_mis_promociones(this.data_usuario.id_usuario).then(respuesta =>{
      this.my_promociones=respuesta;
      console.log(this.my_promociones);
           
     
    });
  }

 
}