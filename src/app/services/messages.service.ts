import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Conversation, Message, RespuestaConversations, RespuestaPersonas } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  newMessage = new EventEmitter<Message>();
  newConversation = new EventEmitter<Conversation>();

  paginaConversations =0;
  paginaPersonas =0;

  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }

  getSupervisores(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaPersonas=0;
    }
    this.paginaPersonas++;
    return this.http.get<RespuestaPersonas>( `${URL}/api/person/get/supervisores?page=${this.paginaPersonas}&buscar=${buscar}`);
  }//.getSupervisores

  getAgentes(){  
    return this.http.get<any>( `${URL}/api/person/get/supervisores`);
  }//.getAgentes
  

  getConversacionesAgente(agent_id:number,pull:boolean =false, buscar:string=''){  
    if(pull){
      this.paginaConversations=0;
    }
    this.paginaConversations++;

    return this.http.get<RespuestaConversations>( `${URL}/api/conversations/get/agent?agent_id=${agent_id}$page=${this.paginaConversations}&buscar=${buscar}`);
  }//.getAgentes

  storeMessage(message:string, conversation_id:number,person_id_dest:number,nuevo:number){
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.usuarioService.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With':'XMMLHttpRequest'
      });
    
      let user = this.usuarioService.getUsuario(); 
      let person_id = user.person_id;

      let postParams={
        'conversation_id':conversation_id,
        'person_id_dest':person_id_dest,
        'person_id_remi':person_id,
        'message':message,
        'nuevo':nuevo,

      }

    return new Promise( resolve=>{
    this.http.post(`${URL}/api/message/store`, postParams, {headers})
          .subscribe(resp=>{
            console.log(resp);
            if( resp['ok'] ){
              if(nuevo==1){
                console.log('nueva conv')
                this.newConversation.emit(resp['conversation']);
                resolve(true);       
              }else{
                console.log('nuevo msg')
                this.newMessage.emit(resp['message']); 
                resolve(true);       
              }
            }else{
              resolve(false);
            }
          });
    });

  }//.storeMessage()


}
