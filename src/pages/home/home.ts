import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
//import { RegistrarAppPage } from '../registrar-app/registrar-app';
import { RegistroBookPage } from '../registro-book/registro-book';
import { MenuPage} from '../menu/menu';
import {RecuperarCuentaPage} from '../recuperar-cuenta/recuperar-cuenta';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import { ToastController } from 'ionic-angular'; 
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  respuesta : any;
  dataFacebook :any;
  bandera:string;
  dataStorage:string;
  todo : FormGroup;
 
  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public toastCtrl: ToastController, 
    public network : ProviderAppProvider, 
    private formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public fb: Facebook,
    private storage: Storage) {
    this.todo = this.formBuilder.group({
      usuario: ['', Validators.email],
      psw: ['', Validators.required]
    });

     this.storage.get(this.bandera).then((bandera) => {
      console.log('Your age is', bandera);
      
      if(bandera!=null)
      {

        this.storage.get(this.dataStorage).then((dataStorage) => {
            console.log('Your age is', dataStorage);

          this.respuesta=dataStorage;          
          this.navCtrl.push(MenuPage,{data_usuario:this.respuesta});
        });
      }
    });
    
    
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1000
    });
    loader.present();
  }

  /*registrar_usuario():void{   
		this.navCtrl.push(RegistrarAppPage);
  }*/

  olvido_contrasena():void{   
		this.navCtrl.push(RecuperarCuentaPage);
  }

  credenciales(usu, contra){
  	this.presentLoading();
    if(usu=='' && contra==''){
   
      let toast = this.toastCtrl.create({
        message: 'Error, los campos estan vacios',
        duration: 3000,
        position: 'top'
        });
      
        toast.present(toast);
    }else{
      this.network.postdata(usu,contra).then( data =>{		 	
  
        this.respuesta =data;        
        console.log(this.respuesta);
        if(this.respuesta.pass==0 && this.respuesta.error=="Usuario o clave invalida"){
        
          let toast = this.toastCtrl.create({
            message: 'Error '+this.respuesta.error,
            duration: 3000,
            position: 'top'
            });
          
            toast.present(toast);
        }
        else{
          if(this.respuesta.pass==0 && this.respuesta.error=="cuenta no activada"){
            let toast = this.toastCtrl.create({
              message: 'Error, su cuenta no está activada',
              duration: 3000,
              position: 'top'
              });
            
              toast.present(toast);
          }else{
            
            this.storage.set(this.bandera, '1');
            this.storage.set(this.dataStorage, this.respuesta);
            
            this.storage.get(this.dataStorage).then((dataStorage) => {
            console.log('Your age is', dataStorage);

        
            this.navCtrl.push(MenuPage,{data_usuario:this.respuesta});

        });

            //this.navCtrl.push(MenuPage,{data_usuario:this.respuesta});	
          }
              
        }
          
       });
      }		 
      
    }

    login_facebook(){

       this.fb.login(['public_profile', 'email'])
        .then(rta => {
           let credencial = firebase.auth.FacebookAuthProvider.credential(rta.authResponse.accessToken); 
           this.presentLoading();
           firebase.auth().signInWithCredential(credencial).then((data)=>{
              
             this.dataFacebook={email : data['email'], nombre_completo:data['displayName']}
              
             this.navCtrl.push(RegistroBookPage, {arreglo:this.dataFacebook} );


           });

        })
        .catch(error =>{
          console.error( error );
        });

    }

}
