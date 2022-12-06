import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Conversation, Persona, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessagesService } from '../../services/messages.service';
import { MessagesPage } from '../messages/messages.page';
import { NewConversationPage } from '../new-conversation/new-conversation.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  usuario:Usuario={};
  habilitado=true;
  textoBuscar:'';
  conversartions:Conversation[]=[];

  persona:Persona={};
  
  constructor(
    private modalCtrl:ModalController,
    private usuarioService:UsuarioService,
    private toastController: ToastController,
    private messagesService:MessagesService
  ) {}

  ngOnInit(): void {
    this.usuario= this.usuarioService.getUsuario();
    this.siguientes(null,true);

    this.messagesService.newConversation
    .subscribe(conversation=>{
      console.log('Emmit new conv')
      console.log(conversation)
      this.conversartions.unshift(conversation);

      this.presentToast("Mensaje nuevo enviado.");
    });

    this.messagesService.newMessage
      .subscribe(msg=>{
        console.log('Emmit new msg')
        console.log(msg)
        this.conversartions=[];
        this.siguientes(null,true);
        this.presentToast("Mensaje enviado.");
      }); 

  }

  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }//.presentToast()

  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.conversartions=[];
  }

  siguientes(event?, pull:boolean=false){
    this.messagesService.getConversacionesAgente(this.usuario.person_id,pull, this.textoBuscar)
      .subscribe( resp=>{
        this.conversartions.push(...resp.data);
        if(event){
          event.target.complete();
          if(resp.data.length ===0){
            //event.target.disabled=true;
            this.habilitado=false;
          }
        }
      });
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.conversartions=[];
    this.siguientes(null,true);
  }

  async openMessages(conversation){
    console.log(conversation);
    const modal = await this.modalCtrl.create({
      component: MessagesPage,
      componentProps:{
        conversation:conversation,
        persona:{},
        nuevo:0
        
      }
    });
    await modal.present();

  }

  async openNewMessages(persona:Persona){
    
    const modal = await this.modalCtrl.create({
      component: MessagesPage,
      componentProps:{
        conversation:{},
        persona:persona,
        nuevo:1,

        
      }
    });
    await modal.present();

  }
  

  async nuevaConversacion(){
    console.log('nueva conversacion')
    const modal = await this.modalCtrl.create({
      component: NewConversationPage,
      
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();
    if(data){
      console.log(data);
      this.persona = data;

      //BUscamos si el super ya existe en las conversaciones
      let idp = Number(this.persona.id)

      console.log('A buscar al sup: '+idp)
      
      let index_c = this.conversartions.findIndex( item=>item.supervisor_id==idp);
      console.log(index_c)
      
      //console.log(this.conversartions)
      
      if(index_c>=0){
        this.openMessages(this.conversartions[index_c])
      }else{

        this.openNewMessages(this.persona)
      }
      

    }


  }

}
