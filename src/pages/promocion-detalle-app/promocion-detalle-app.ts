import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { ToastController } from 'ionic-angular'; 

@IonicPage()
@Component({
  selector: 'page-promocion-detalle-app',
  templateUrl: 'promocion-detalle-app.html',
})
export class PromocionDetalleAppPage {

  datos: any;
  usuario :any;
  data : any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public alertCtrl: AlertController, 
  	public network : ProviderAppProvider, 
  	public toastCtrl: ToastController, 
  	public viewCtrl: ViewController ) { 
    this.datos=navParams.data.item;
    this.usuario=navParams.data.usuario;
    console.log(this.datos);
    console.log(this.usuario);  

  }

  participar(){

    let confirm = this.alertCtrl.create({
      title: '¿Desea participar?',
      message: 'Estas seguro que desea participar en esta promocion ?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //this.navCtrl.pop();
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            
            this.network.participacion_promocion(this.datos.id_promocion,this.usuario.id_usuario).then(respuesta =>{
             
              console.log(respuesta);
              this.data=respuesta;
        
              if(this.data.id==1 && this.data.error==""){

                let alert = this.alertCtrl.create({
                  title: 'Felicidades',
                  message: 'Estas participando en nuestra promocion.',
                  buttons: ['Ok']
                });
                alert.present()
        
              }else{
                if(this.data.id==0 && this.data.error=="ya esta participando"){
                  let alert = this.alertCtrl.create({
                    title: 'Alerta',
                    message: 'Ya estas participando en esta promoción',
                    buttons: ['Ok']
                  });
                  alert.present()
                }else{
                  let alert = this.alertCtrl.create({
                    title: 'Error Inesperado',
                    message: 'Error',
                    buttons: ['Ok']
                  });
                  alert.present()
                }
        
              }
        
           });            
            
          }
        }
      ]
    });
    confirm.present();
  }


  close()
  {
  	this.viewCtrl.dismiss();
  }

}