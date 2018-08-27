import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cambio-contrasena',
  templateUrl: 'cambio-contrasena.html',
})
export class CambioContrasenaPage {
  todo : FormGroup;
  mensaje:boolean;
  dato :any;
  respuesta:any;
  json:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private formBuilder: FormBuilder, 
  	public network : ProviderAppProvider, 
  	public alertCtrl: AlertController,
  	public viewCtrl : ViewController) {
    this.json=navParams.data.data_usuario;
    
    this.todo = this.formBuilder.group({
      contra_actual: ['',  Validators.required],
      psw: ['',  Validators.required],
      confpsw: ['', Validators.required]
     
    });

  }
  guardar_contrasena(psw_actual,new_psw,confpsw){ 
    
    
    let confirm = this.alertCtrl.create({
      title: 'Actualizar contraseña ',
      message: 'Seguro actualizar la contraseña ?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Actualizar',
          handler: () => {
                this.network.actualizar_contrasena(this.json.id_usuario,psw_actual,new_psw,confpsw).then(data =>{
                    this.respuesta=data;
                     console.log(this.respuesta); 
                    if(this.respuesta.id==1 && this.respuesta.error==""){
                      let alert = this.alertCtrl.create({
                        title: 'Actualizado',
                        subTitle: 'Contraseña actualizada exitosamente',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.navCtrl.pop();
                    }
                    else{
                        let alert = this.alertCtrl.create({
                          title: 'Inesperado',
                          subTitle: this.respuesta.error,
                          buttons: ['OK']
                        });
                        alert.present();
                        //this.navCtrl.pop();            
          
                    }
                });  
             
          }
        }
      ]
    });
    confirm.present();  
    
     

  }

  verificar(psw,pass){   
    
    if(psw!=pass){
      this.mensaje=true;
    }
    else{
       this.mensaje=false;
    }   
    
  }

   

  close()
  {
  	this.viewCtrl.dismiss();
  }
}