import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string = null;
  private usuario:Usuario={};

  constructor(
    private http:HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { 
    this.storage.create();
  }

  login(email:string, password:string){
    const data = {email, password };

    return new Promise( resolve =>{
      this.http.post(`${URL}/api/auth/login`,data)
              .subscribe( async resp=>{
                console.log(resp);
                if( resp['ok'] ){
                  await this.guardarToken( resp['access_token'] ); 
                  resolve(true);       
                }else{
                  this.token = null;
                  this.storage.clear();
                  resolve(false);
                }
              });
    } );

    
  }

  getUsuario(){    
    console.log('get USR')
    if(this.usuario.id){
      this.validaToken();
    }

    return {...this.usuario}
  }

  async guardarToken (token:string){
    this.token = token;
    await this.storage.set('token',token);
    await this.validaToken();
    
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken():Promise<boolean>{

    await this.cargarToken();    

    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve=>{

      const headers=new HttpHeaders({
        'Authorization': 'Bearer '+this.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With':'XMMLHttpRequest'
      });

      this.http.get(`${URL}/api/auth/user`, {headers})
          .subscribe(resp=>{
            if(resp['ok']){
              this.usuario=resp['usuario'];
              resolve(true);
            }else{
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          });

    });

  }

  logout(){

    this.token=null;
    this.usuario =null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login',{animated:true});

  }

  getPersonInformation(persona_id){  
    return this.http.get<any>( `${URL}/api/person/get/info?persona_id=${persona_id}`);
  }//.getPersonInformation

}
