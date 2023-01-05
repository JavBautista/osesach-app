import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Conversation, Persona, Usuario } from 'src/app/interfaces/interfaces';
import { MessagesService } from '../../services/messages.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  new_message:string='';

  usuario:Usuario={};

  @Input() conversation:Conversation;
  @Input() persona:Persona;
  @Input() nuevo:number;

  constructor(
    private modalCtrl:ModalController,
    private toastController: ToastController,
    private messagesService:MessagesService,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    console.log(this.conversation);

    this.usuario=this.usuarioService.getUsuario();
    this.actualizarMensagesNoLeidos();
    
  }

  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }//.presentToast()

  cerrar(){
    this.modalCtrl.dismiss();
  }

  async enviarMsg(){
    console.log(this.new_message);     
    let conversation_id = 0;
    let person_destino_id  = 0;    
    if(this.nuevo==1){
      person_destino_id= this.persona.id;
    }else{
      conversation_id= this.conversation.id;
    }
    await this.messagesService.storeMessage(this.new_message,conversation_id,person_destino_id,this.nuevo);
    
    this.cerrar();
    
  }
  
  async actualizarMensagesNoLeidos(){
    if(this.nuevo != 1){      
      let conversation_id= this.conversation.id;
      await this.messagesService.updateMessagesNotRead(conversation_id);
    }

  }

}
