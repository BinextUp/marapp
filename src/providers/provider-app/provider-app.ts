import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProviderAppProvider {

  constructor(public http: HttpClient) {
    
  }
  api : string = 'http://www.gomargaritaparadise.com/appadmin/apis/';
  //api : string = 'http://www.julio.hang.com.ve/apis/';

  postdata(usu, contra){ 	
 
    try {return this.http.get(this.api+"apisesion.php?user="+usu+"&pwd="+contra).toPromise();}
     catch (error) {
     console.log("error en el return en postdata de provider");
      
    }
  }

  actualizar_perfil(id,nomb,ape,ced,fecha,cel){ 
    
    try    

    {return this.http.get(this.api+"apieditar.php?idUser="+id+"&nombre="+nomb+"&apellido="+ape+"&cedula="+ced+"&fecha="+fecha+"&telefono="+cel).toPromise();}
    catch (error) {
      console.log("error en el return en actualizar_perfil de provider");
    }
  }

  registrar_perfil(id,nomb,ape,ced,fecha,cel){
    try    

    {return this.http.get(this.api+"apiregistro.php?idUser="+id+"&nombre="+nomb+"&apellido="+ape+"&cedula="+ced+"&fecha="+fecha+"&telefono="+cel).toPromise();}
    catch (error) {
      console.log("error en el return en actualizar_perfil de provider");
    }
  }

  promociones(){
   
    try{ return this.http.get(this.api+"apipromociones.php").toPromise();}
    catch (error) {
      console.log("error en el return en promociones de provider");
    }
  }
  
  participacion_promocion(id_promo, id_usu){
    try  
    {return this.http.get(this.api+"apipromociones.php?idUser="+id_usu+"&idPromo="+id_promo).toPromise();}
    catch (error) {
     
    }
  }
  registrar_usuario(nomb,ape,correo,psw){
   
    try 
    {return this.http.get(this.api+"apiregistro.php?nombre="+nomb+"&apellido="+ape+"&correo="+correo+"&contrasena="+psw).toPromise();}
    catch (error) {
      console.log("error en el return en registrar_usuario de provider");
    }
  }
  cargar_mis_promociones(id_usuario){
    try 
    {return this.http.get(this.api+"apipromociones.php?idUser="+id_usuario).toPromise();}
    catch (error) {      
      console.log("error en el return en cargar_mis_promociones de provider");
    }
  }
  
  actualizar_contrasena(id,actual,psw, confirm){
   
   try  
    { return this.http.get(this.api+"apieditar.php?idUser="+id+"&contrasena="+actual+"&contrasenaNueva="+psw+"&confirm="+confirm).toPromise();}
    catch (error) {
      console.log("error en el return en actualizar_contrasena de provider");
    }
  }

  cargar_mapa(){
    return this.http.get(this.api+"apilocalizacion.php").toPromise();
  }

  recuperar_cuenta(email){
    return this.http.get(this.api+email).toPromise();
  }

 


}
