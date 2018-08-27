import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MisPromocionesAppPage } from '../mis-promociones-app/mis-promociones-app';



@IonicPage()
@Component({
  selector: 'page-perfil-app',
  templateUrl: 'perfil-app.html',
})
export class PerfilAppPage {
  respuesta: any;
  usuario: any;
  usuario2:any;
  bandera : boolean=false;
  todo : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public network : ProviderAppProvider, public alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.usuario=navParams.data.usua;
    console.log(this.usuario);
    
    if(this.usuario.cedula==null && this.usuario.fecha==null && this.usuario.telefono==null)
    {
    	this.bandera=true;
    }    
    

    this.todo = this.formBuilder.group({
      nomb: ['', [ Validators.required,Validators.pattern('[A-Za-z\ ]+') ]],
      ape: ['', [Validators.required,Validators.pattern('[A-Za-z\ ]+') ]],
      correo: ['', [ Validators.required,Validators.email]],
      ced:['', Validators.pattern('[0-9]+')],
      fecha:[''],
      sexo:['', Validators.required],
      cel:['', Validators.pattern('[0-9]+')]
    });
    
  }

  modificar_perfil(nomb,ape,ced,fecha,cel,correo){
     
     
     let confirm = this.alertCtrl.create({
       title: 'Desea actualizar los datos ?',
       message: 'Estas seguro que los datos que envias en el formulario son correctos ?',
       buttons: [
         {
           text: 'Cancelar',
           handler: () => {
             this.navCtrl.pop();
           }
         },
         {
           text: 'Guardar',
           handler: () => {
             
               if(this.bandera==true){
               		this.network.registrar_perfil(this.usuario.id_usuario,nomb,ape,ced,fecha,cel).then(data=>{
		               this.respuesta =data;                
		                
		                 if(this.respuesta.id==1 && this.respuesta.error==""){
		                   let alert = this.alertCtrl.create({
		                     title: 'Datos Guardado',
		                     subTitle: 'Gracias, sus datos han sido guardado exitosamente',
		                     buttons: ['OK']
		                   });
		                   alert.present();

		                   this.usuario2={
		                   	  'nombre' : nomb,
		                      'apellido' : ape,
		                      'cedula' : ced,
		                      'correo' : correo,
		                      'fecha' : fecha,
		                      'id_usuario' : this.usuario.id_usuario,                      
		                      'pass' : this.usuario.pass,
		                      'telefono' : cel
		                    }  

		                   
		                   this.navCtrl.setRoot(MisPromocionesAppPage,{data_usuario:this.usuario2});                  
		                   
		                 }
		                 else{
		                   if(this.respuesta.id==1 && this.respuesta.mail=="enviado"){
		                     let alert = this.alertCtrl.create({
		                       title: 'Guardando',
		                       subTitle: this.respuesta.enviado,
		                       buttons: ['OK']
		                     });
		                     alert.present();

		                   }
		                   else{
		                     let alert = this.alertCtrl.create({
		                       title: 'Error',
		                       subTitle: 'datos inesperado',
		                       buttons: ['OK']
		                     });
		                     alert.present();
		                   }                 

		                 }  
		             });




               }else{
               		this.network.actualizar_perfil(this.usuario.id_usuario,nomb,ape,ced,fecha,cel).then(data=>{
		               this.respuesta =data;                
		                
		                 if(this.respuesta.id==1 && this.respuesta.error==""){
		                   let alert = this.alertCtrl.create({
		                     title: 'Datos actualizado',
		                     subTitle: 'Gracias, sus datos han sido actualizado exitosamente',
		                     buttons: ['OK']
		                   });
		                   alert.present();

		                   this.usuario2={
		                   	  'nombre' : nomb,
		                      'apellido' : ape,
		                      'cedula' : ced,
		                      'correo' : correo,
		                      'fecha' : fecha,
		                      'id_usuario' : this.usuario.id_usuario,                      
		                      'pass' : this.usuario.pass,
		                      'telefono' : cel
		                    }  

		                   
		                   this.navCtrl.setRoot(MisPromocionesAppPage,{data_usuario:this.usuario2});                  
		                   
		                 }
		                 else{
		                   if(this.respuesta.id==1 && this.respuesta.mail=="enviado"){
		                     let alert = this.alertCtrl.create({
		                       title: 'Guardando',
		                       subTitle: this.respuesta.enviado,
		                       buttons: ['OK']
		                     });
		                     alert.present();

		                   }
		                   else{
		                     let alert = this.alertCtrl.create({
		                       title: 'Error',
		                       subTitle: 'datos inesperado',
		                       buttons: ['OK']
		                     });
		                     alert.present();
		                   }                 

		                 }  
		             });
               }// fiin bandera
           }
         }
       ]
     });
     confirm.present();
 }

}
