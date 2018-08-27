import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';

/**
 * Generated class for the RecuperarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-cuenta',
  templateUrl: 'recuperar-cuenta.html',
})
export class RecuperarCuentaPage {
  todo : FormGroup;
  respuesta :any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public network : ProviderAppProvider,
    public loadingCtrl: LoadingController) {
      
      this.todo = this.formBuilder.group({
       
        correo: ['', [ Validators.required,Validators.email]]
       
      }); 
  }
  

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    loader.present();
  }

  enviar_email(email){
    let confirm = this.alertCtrl.create({
      title: 'Enviar Correo',
      message: '¿Desea recuperar cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Enviar',
          handler: () => {
              this.presentLoading();
              this.network.recuperar_cuenta(email).then(data=>{
              this.respuesta =data;

              
              if(this.respuesta.error=='' && this.respuesta.mail=='enviado'){

                  let alert = this.alertCtrl.create({
                   title: 'Correos Enviado',
                   message: 'Revise su bandeja de correo electronico.',
                   buttons: [
                     {
                       text: 'Ok',
                       handler: () => {
                         this.navCtrl.pop();
                       }
                     }
                   ]
                 });
                 alert.present();
                }
                else{
                 if( this.respuesta.error=="no existe"){                    

                    let alert = this.alertCtrl.create({
                     title: 'Correo no registrado',
                     message: this.respuesta.enviado,
                     buttons: ['Ok']
                   });
                   alert.present();                     

                  }
                  else{
                    let alert = this.alertCtrl.create({
                      title: 'Error',
                      message: 'Error',
                      buttons: ['OK']
                    });
                    alert.present();
                  }                 

                }
                
              
            });
          }
        }
      ]
    });
    confirm.present();  





  }

}
