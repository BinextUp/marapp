import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { RedesAppPage }from '../../pages/redes-app/redes-app';
import { PromocionDetalleAppPage } from '../promocion-detalle-app/promocion-detalle-app';
import { MisPromocionesAppPage } from '../mis-promociones-app/mis-promociones-app'; 


@IonicPage()

@Component({
  selector: 'page-promocion-app',
  templateUrl: 'promocion-app.html',
})
export class PromocionAppPage {
  datos:any;
  datos_usuario:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public network : ProviderAppProvider,
  	public modalCtrl : ModalController
  	) {
    this.datos_usuario=navParams.data.data_usuario;
    console.log(this.datos_usuario);
    
    this.promocion();

  } 

  promocion(){
    this.network.promociones().then( data =>{
      
      this.datos=data;
      console.log(this.datos);
    });
  }

  redes_sociales():void{
    this.navCtrl.push(RedesAppPage);
  }
  
  detalles(item){
  	
  	let  modal= this.modalCtrl.create(PromocionDetalleAppPage , {item: item, usuario:this.datos_usuario});
    
    modal.present();
    modal.onDidDismiss(data => console.log(data));
    //this.navCtrl.push(PromocionDetalleAppPage , {item: item, usuario:this.datos_usuario});
  }

  promocion_perfil(){
    this.navCtrl.push(MisPromocionesAppPage , {usu:this.datos_usuario});
  }
}