import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registro-book',
  templateUrl: 'registro-book.html',
})
export class RegistroBookPage {
  book : any;
  respuesta : any;
  arre=[];
  todo : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public network : ProviderAppProvider, public alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.book=navParams.data.arreglo;
    this.arre=this.book.nombre_completo.split(" ");

    this.todo = this.formBuilder.group({
      nomb: ['', [ Validators.required,Validators.pattern('[A-Za-z]+') ]],
      ape: ['', [ Validators.required,Validators.pattern('[A-Za-z]+') ]],
      correo: ['', [ Validators.required,Validators.email]],
      psw: ['', Validators.required],
      confpsw: ['', Validators.required]
    });

  }

  guardar_usuario_facebook(nombre, apellido, contrasena){
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
            
              this.network.registrar_usuario(nombre,apellido,this.book.email,contrasena).then(data=>{
              this.respuesta =data;
              
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
                     message: this.respuesta.error,
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
                    let alert = this.alertCtrl.create({
                      title: 'Error',
                      message: this.respuesta.error +' '+ this.respuesta.mail,
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