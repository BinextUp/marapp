import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { LogoMenuPage } from '../logo-menu/logo-menu'; 
import { Storage } from '@ionic/storage'; 




@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
	@ViewChild('NAV') nav : Nav;
	rootPage:any ;
	data_usuario : any;
	bandera:string;
  	dataStorage:string;
	public pagina: Array<{ titulo: string, componente : any, icono: string }>; 
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public alertCtrl: AlertController,
		private storage: Storage) {

		this.data_usuario= this.navParams.data.data_usuario;
		//console.log(this.data_usuario);
		
		this.rootPage= LogoMenuPage;
		this.pagina=[			
			{ titulo: 'Promociones', componente : 'PromocionAppPage', icono: 'bookmarks' },
			{ titulo: 'Guia Urbana', componente : 'GuiaAppPage', icono: 'locate' },
			{ titulo: 'Perfil', componente : 'MisPromocionesAppPage', icono: 'contact' },
			{ titulo: 'Redes', componente : 'RedesAppPage', icono: 'logo-instagram' },
			{ titulo: 'Cerrar Session', componente : '', icono: 'md-close-circle' }

		];
  
  }
  
  entre_pagina(component):void{
  	
  	if(component!=""){
  		this.navCtrl.push(component, {data_usuario: this.data_usuario});
  	}
  	else{
  		let confirm = this.alertCtrl.create({
	    title: 'Estas seguro en cerrar sesion ?',
	    buttons: [
	        {
	          text: 'Cancelar',
	          handler: () => {
	            //this.navCtrl.pop();
	          }
	        },
	        {
	          text: 'Cerrar',
	          handler: () => {            
	            this.storage.remove(this.bandera);
	            this.storage.remove(this.dataStorage);
	            this.navCtrl.pop();
	          }
	        }
	      ]
	    });
	    confirm.present();
	  	}
	  	
	  }

}




