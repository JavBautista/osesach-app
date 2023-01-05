import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaDirectories, Visit, Directory } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class DirectoriesService {

  newVisita = new EventEmitter<Visit>();

  newDirectory          = new EventEmitter<Directory>();
  updateDirectory       = new EventEmitter<Directory>();
  deleteDirectoryImage  = new EventEmitter<Directory>();
  storeNewImage         = new EventEmitter<Directory>();

  sessionFailed = new EventEmitter();


  paginaDirectory =0;

  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }
  

  
  getDirectories(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaDirectory=0;
    }
    this.paginaDirectory++;
    console.log('Pagina No '+ this.paginaDirectory);
    console.log(`Link: ${URL}/api/directory?page=${this.paginaDirectory}&buscar=${buscar}`);
    return this.http.get<RespuestaDirectories>( `${URL}/api/directory?page=${this.paginaDirectory}&buscar=${buscar}`);
  }//.getDirectories()
  
  
  getResumenAvanceAgente(persona_id:number){
    
    let url_api = `${URL}/api/directory/agent-resumen-avance?agente_id=${persona_id}`;
    console.log('URL: '+url_api)
    return this.http.get<any>( url_api  );
  }//.getResumenAvanceAgente()

  getDirectoriesAgent(visitados:boolean=false,pull:boolean =false, buscar:string=''){
    
    let user = this.usuarioService.getUsuario();     
    let person_id = user.person_id;
    let var_visitados = visitados?1:0;
    if(pull){
      this.paginaDirectory=0;
    }
    this.paginaDirectory++;
    let url_api = `${URL}/api/directory/agent-asignacion?visitados=${var_visitados}&agente_id=${person_id}&page=${this.paginaDirectory}&buscar=${buscar}`;
    console.log('URL: '+url_api)
    return this.http.get<RespuestaDirectories>( url_api  );
  }//.getDirectoriesAgent()



  guardarVisita(directory_id, status, observations, consulta,no_personas_hombres,no_personas_mujeres,rango_edades, latitud, longitud){

    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With':'XMMLHttpRequest'
    });

    let user = this.usuarioService.getUsuario(); 
    console.log('User ID:')
    console.log(user.person_id)
    let person_id = user.person_id;

    let postParams={
      user_id:person_id,
      directory_id:directory_id,
      status:status,
      observations:observations,
      consulta:consulta,
      no_personas_hombres:no_personas_hombres,
      no_personas_mujeres:no_personas_mujeres,
      rango_edades:rango_edades,
      latitud:latitud,
      longitud:longitud

    }
    //console.log('API store');
    console.log(postParams);
    return new Promise( resolve=>{
      this.http.post(`${URL}/api/visit/store`, postParams, {headers})
                .subscribe(resp=>{
                  if( resp['ok'] ){
                    this.newVisita.emit(resp['visit']); 
                    resolve(true);       
                  }else{                    
                    resolve(false);
                  }
                });
    });

  }//.guardarVisita()

  storeDirectory(directory){
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With':'XMMLHttpRequest'
      });
    
      let user = this.usuarioService.getUsuario(); 
      console.log('User ID:')
      console.log(user.person_id)
      let person_id = user.person_id;

      let postParams={
        'directory':directory,
        'person_id':person_id
      }
    return new Promise( resolve=>{
    this.http.post(`${URL}/api/directory/store`, postParams, {headers})
          .subscribe(resp=>{
            console.log(resp);
            if( resp['ok'] ){
              this.newDirectory.emit(resp['directory']); 
              resolve(true);       
            }else{
              
              resolve(false);
            }
          });
    });

  }//.storeDirectory()

  actualizarDirectory(directory){
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With':'XMMLHttpRequest'
    });

    return new Promise( resolve=>{
      this.http.post(`${URL}/api/directory/update`, directory, {headers})
        .subscribe(resp=>{
          console.log(resp);
          if( resp['ok'] ){
            this.updateDirectory.emit(resp['directory']); 
            resolve(true);       
          }else{            
            resolve(false);
          }
        });
    });

  }//.actualizarDirectory()

  getSearchDirectories(pull:boolean =false,buscar){
    if(pull){
      this.paginaDirectory=0;
    }
    this.paginaDirectory++;

    let user = this.usuarioService.getUsuario(); 
    if(!user.person_id){
      this.sessionFailed.emit(); 
    }
    return this.http.get<RespuestaDirectories>( `${URL}/api/directory/buscar?buscar=${buscar}&page=${this.paginaDirectory}`);
  }//.getSearchDirectories()

  getResumenAvanceGeneral(){
    
    let url_api = `${URL}/api/directory/resumen-avance-general`;
    console.log('URL: '+url_api)
    return this.http.get<any>( url_api  );
  }//.getResumenAvanceAgente()


  eliminarDirectoryImage(directory){
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With':'XMMLHttpRequest'
    });

    return new Promise( resolve=>{
      this.http.post(`${URL}/api/directory/delete-image`, directory, {headers})
        .subscribe(resp=>{
          console.log(resp);
          if( resp['ok'] ){
            this.deleteDirectoryImage.emit(resp['directory']); 
            resolve(true);       
          }else{            
            resolve(false);
          }
        });
    });

  }//.actualizarDirectory()

  uploadPicture(formData:FormData){
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      });

    const url = `${URL}/api/directory/update-image`;
    
    return new Promise( resolve=>{
      this.http.post(url, formData, {headers}) 
                .subscribe(resp=>{
                  console.log(resp);
                  if( resp['ok'] ){
                    this.storeNewImage.emit(resp['directory']); 
                    resolve(true);       
                  }else{                    
                    resolve(false);
                  }
                });
    });
 
  }//.uploadPicture()

}
