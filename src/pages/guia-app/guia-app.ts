import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MiPerfilMapaPage } from '../mi-perfil-mapa/mi-perfil-mapa';
import { ProviderAppProvider } from '../../providers/provider-app/provider-app';
import L from 'leaflet';
import 'leaflet-routing-machine';

@IonicPage()
@Component({
  selector: 'page-guia-app',
  templateUrl: 'guia-app.html',
})
export class GuiaAppPage {

  @ViewChild('map') mapRef : ElementRef;

  map: L.Map;
  center: L.PointTuple;
  json :any;
  jsonn :any;
  latitud:any;
  longitud:any;
  marker :any;

  orangeIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  blueIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 35],
    iconAnchor: [30, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  violetIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  blackIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  yellowIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  redIcon:any = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  

  constructor(
    public navCtrl: NavController,  
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public network : ProviderAppProvider ) {
 
  }

  ionViewDidLoad() {
   
    this.initMap();
    this.miUbicacion();
    this.todo_mapa();
  }

  initMap() {
      
      
        this.map = L.map("map").fitWorld();
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attributions: 'Binext, Inc',
          maxZoom: 20
        }).addTo(this.map);       
     
  }

  miUbicacion(){
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
    
      this.latitud = e.latitude;
      this.longitud = e.longitude;
      let markerGroup = L.featureGroup();
      this.marker = L.marker([e.latitude, e.longitude], {icon: this.redIcon}).bindPopup("Yo");

        /*let modal = this.modalCtrl.create(MiPerfilMapaPage);
        modal.present();
        modal.onDidDismiss(data => console.log(data));*/
     
      markerGroup.addLayer(this.marker);          
      this.map.addLayer(markerGroup);
      
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }


  todo_mapa(){
   
   
    this.network.cargar_mapa().then(data =>{

      this.json=data;
      console.log(this.json);
      let markerGroup = L.featureGroup();  
    
      
      for (let i = 0; i < this.json.length; i++) {
        
        
        switch (this.json[i].id_categoria) {
          case "1":
          {

            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud],{icon: this.orangeIcon}).on('click', () => {
    
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
              modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                 
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }
          case "2":
          {
             
      
            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud], {icon: this.blueIcon}).on('click', () => {
            
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
              modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }
          case "6":
          {

            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud], {icon: this.violetIcon}).on('click', () => {
            
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
               modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }
          case "5":
          {
   
      
            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud], {icon: this.blackIcon}).on('click', () => {
            
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
               modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }
          case "3":
          {
             
      
            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud], {icon: this.yellowIcon}).on('click', () => {
            
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
               modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }
          case "4":
          {
             
      
            let marker: any = L.marker([this.json[i].latitud,this.json[i].longitud], {icon: this.yellowIcon}).on('click', () => {
            
            let modal = this.modalCtrl.create(MiPerfilMapaPage, {datos:this.json[i]});
              modal.present();
               modal.onDidDismiss(data => {
                
                if(data.retornar!="ventana"){
                  this.ruta_mapa(data.retornar.latitud,data.retornar.longitud,data.retornar.id_categoria,marker);
                }
              });
      
            })              
            markerGroup.addLayer(marker);          
            this.map.addLayer(markerGroup);
            break;
          }

        }
  
      }  

      
      });
       

  }


  ruta_mapa(lat,long,categoria,mar){

    /*this.network.cargar_mapa().then(data =>{ 

      this.jsonn=data;
      console.log(this.jsonn);
      //this.map.removeLayer(this.marker);
      //this.map.removeLayer(mar);
      let markerGroup = L.featureGroup();  
      
      for (let i = 0; i < this.jsonn.length; i++) {
        
        
          console.log(L.marker([this.jsonn[i].latitud,this.jsonn[i].longitud]));
          
            
          let marker : any =L.layerGroup([this.jsonn[i].latitud,this.jsonn[i].longitud]).addTo(this.map);     
            
          //markerGroup.addLayer(marker);

          //console.log(markerGroup);
          
          marker.clearLayers();    
         
      } 
      
      
    }); */  
    
    this.map.removeLayer(this.marker);
    this.map.removeLayer(mar);
    switch (categoria) {
      case "1":
      {
        
       
        L.Routing.control({
          waypoints: [
          
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.orangeIcon})
          ]
        }).addTo(this.map);
        
        break;
      }
      case "2":
      {
        L.Routing.control({
          waypoints: [
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.blueIcon})
          ]
        }).addTo(this.map);
        break;
      }
      case "6":
      {
        L.Routing.control({
          waypoints: [
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.violetIcon})
          ]
        }).addTo(this.map);
        break;
      }
      case "5":
      {
        L.Routing.control({
          waypoints: [
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.blackIcon})
          ]
        }).addTo(this.map);
        break;
      }
      case "3":
      {
        L.Routing.control({
          waypoints: [
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.yellowIcon})
          ]
        }).addTo(this.map);
        break;
      }
      case "4":
      {
        L.Routing.control({
          waypoints: [
            L.latLng([this.latitud, this.longitud], {icon: this.redIcon}),
            L.latLng([lat, long], {icon: this.yellowIcon})
          ]
        }).addTo(this.map);
        break;
      }

    }
    
    
  }

  

}
