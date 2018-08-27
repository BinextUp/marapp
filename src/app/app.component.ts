import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  dataStorage:string;
  bandera:string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    /*this.storage.get(this.bandera).then((bandera) => {
      console.log('Your age is', bandera);
      
      if(bandera==1)
      {

        this.storage.get(this.dataStorage).then((dataStorage) => {
            console.log('Your age is', dataStorage);

            
           //console.log('JSON MAPEADO', this.respuesta);
          this.navCtrl.push(MenuPage,{data_usuario:dataStorage});

        });
      }



    });*/
  }
}

