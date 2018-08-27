import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from 'ionic-angular';


@IonicPage({
})

@Component({
  selector: 'page-registrar-app',
  templateUrl: 'registrar-app.html',
})
export class RegistrarAppPage {
  texto  : any;
  respuesta :any;
  todo : FormGroup;
  mensaje:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public network : ProviderAppProvider, 
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {
    this.todo = this.formBuilder.group({
      nomb: ['', [ Validators.required,Validators.pattern('[A-Za-z\ ]+')]],
      ape: ['', [ Validators.required,Validators.pattern('[A-Za-z\ ]+') ]],
      correo: ['', [ Validators.required,Validators.email]],
      psw: ['', Validators.required],
      confpsw: ['', Validators.required]
    });
    
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    loader.present();
  }
  guardar_usuario(nomb,ape,correo,psw){    
     
     let confirm = this.alertCtrl.create({
       title: 'Desea guardar los datos ?',
       message: 'Estas seguro que los datos que envias en el formulario son los correcto ?',
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
               this.network.registrar_usuario(nomb,ape,correo,psw).then(data=>{
               this.respuesta =data;

               console.log(this.respuesta); /*CONECTA ESTE .i. */
               if(this.respuesta.error=='' && this.respuesta.mail=='enviado'){

                   let alert = this.alertCtrl.create({
                    title: 'Correos de Confirmacion',
                    message: 'Gracias por la informacion, se le ha enviado un correo para autenticar sus datos.',
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
                  if( this.respuesta.error=="cuenta no activada"){                    

                     let alert = this.alertCtrl.create({
                      title: 'Confirmar mail',
                      message: this.respuesta.enviado,
                      buttons: ['Ok']
                    });
                    alert.present();                     

                   }
                   else{
                     let alert = this.alertCtrl.create({
                       title: 'Error',
                       message: 'El correo se encuentra registrado',
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
  goBack():void{
  	this.navCtrl.pop();
  }

  verificar(psw,pass){   
    
    if(psw!=pass){
      this.mensaje=true;
    }
    else{
       this.mensaje=false;
    }   
    
  }
}