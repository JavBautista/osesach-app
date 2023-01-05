import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Conversation, Message, RespuestaConversations, RespuestaPersonas } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class MessagesService  {

  newMessage = new EventEmitter<Message>();
  newConversation = new EventEmitter<Conversation>();
  updateMessagesToRead = new EventEmitter<any>();

  paginaConversations =0;
  paginaPersonas =0;

  constructor(
    private http:HttpClient,
    private usuarioService:UsuarioService
  ) { }

  getMessagesNotRead(){
    let user = this.usuarioService.getUsuario(); 
    let person_id = user.person_id;
    
    return this.http.get<any>( `${URL}/api/messages/get-not-read?person_id=${person_id}`);
  }//.getMessagesNotRead

  getPeopleForMessages(pull:boolean =false, buscar:string=''){
    if(pull){
      this.paginaPersonas=0;
    }
    let user = this.usuarioService.getUsuario(); 
    let person_id = user.person_id;
    let role_id = user.role_id;
    this.paginaPersonas++;
    console.log(`${URL}/api/person/get/personal-for-messages?person_id=${person_id}&role_id=${role_id}&page=${this.paginaPersonas}&buscar=${buscar}`);
    return this.http.get<RespuestaPersonas>( `${URL}/api/person/get/personal-for-messages?person_id=${person_id}&role_id=${role_id}&page=${this.paginaPersonas}&buscar=${buscar}`);
  }//.getPeopleForMessages
  

  getConversaciones(person_id:number,pull:boolean =false, buscar:string=''){  
    if(pull){
      this.paginaConversations=0;
    }
    this.paginaConversations++;

    return this.http.get<RespuestaConversations>( `${URL}/api/conversations/get?person_id=${person_id}$page=${this.paginaConversations}&buscar=${buscar}`);
   
  }//.getConversaciones

 

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


  updateMessagesNotRead(conversation_id:number){
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
        'person_id':person_id
      }

    return new Promise( resolve=>{
    this.http.post(`${URL}/api/conversation/update-messages-to-read`, postParams, {headers})
          .subscribe(resp=>{
            console.log(resp);
            if( resp['ok'] ){
              this.updateMessagesToRead.emit();
              resolve(true);                     
            }else{
              resolve(false);
            }
          });
    });

  }//.updateMessagesNotRead()


}
