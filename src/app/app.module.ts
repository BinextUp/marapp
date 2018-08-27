import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPageModule } from '../pages/menu/menu.module';
import { GuiaAppPageModule } from '../pages/guia-app/guia-app.module';
import { PromocionAppPageModule } from '../pages/promocion-app/promocion-app.module';
import { RedesAppPageModule } from '../pages/redes-app/redes-app.module';
import { PromocionDetalleAppPageModule } from '../pages/promocion-detalle-app/promocion-detalle-app.module';
import { LogoMenuPageModule } from '../pages/logo-menu/logo-menu.module';
import { RegistrarAppPageModule } from '../pages/registrar-app/registrar-app.module';
import { CambioContrasenaPageModule } from '../pages/cambio-contrasena/cambio-contrasena.module';
import { PerfilAppPageModule } from '../pages/perfil-app/perfil-app.module';
import { RegistroBookPageModule } from '../pages/registro-book/registro-book.module';
import {CategoriaMapaPageModule} from '../pages/categoria-mapa/categoria-mapa.module';
import {RecuperarCuentaPageModule} from '../pages/recuperar-cuenta/recuperar-cuenta.module'

import {MiPerfilMapaPageModule} from '../pages/mi-perfil-mapa/mi-perfil-mapa.module';

import { ProviderAppProvider } from '../providers/provider-app/provider-app';
import { HttpClientModule} from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

export const firebaseConfig={
    apiKey: "AIzaSyB0MEmDOghAuOAhQ0vWIBhKVKywvAGbpR8",
    authDomain: "trim-icon-204519.firebaseapp.com",
    databaseURL: "https://trim-icon-204519.firebaseio.com",
    projectId: "trim-icon-204519",
    storageBucket: "trim-icon-204519.appspot.com",
    messagingSenderId: "684329013915"
}

firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MenuPageModule,
    PromocionAppPageModule,
    GuiaAppPageModule,
    RedesAppPageModule,
    PromocionDetalleAppPageModule,
    LogoMenuPageModule,
    RegistrarAppPageModule,
    CambioContrasenaPageModule,
    PerfilAppPageModule,
    RegistroBookPageModule,
    MiPerfilMapaPageModule,
    CategoriaMapaPageModule,
    RecuperarCuentaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderAppProvider,
    Facebook,
    Geolocation
    
  ]
})
export class AppModule {}
