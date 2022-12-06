import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/interfaces';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.page.html',
  styleUrls: ['./new-conversation.page.scss'],
})
export class NewConversationPage implements OnInit {

  
  habilitado=true;
  personas: Persona[]=[];
  textoBuscar:'';

  constructor(
    private modalCtrl:ModalController,
    private messagesService:MessagesService
  ) { }

  ngOnInit() {
    this.siguientes(null,true);
  }

  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.personas=[];
  }

  siguientes(event?, pull:boolean=false){
    this.messagesService.getSupervisores(pull, this.textoBuscar)
      .subscribe( resp=>{
        this.personas.push(...resp.data);
        if(event){
          event.target.complete();
          if(resp.data.length ===0){
            //event.target.disabled=true;
            this.habilitado=false;
          }
        }
      });
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  selectPersona(persona){
    this.modalCtrl.dismiss(persona);
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.personas=[];
    this.siguientes(null,true);
  }


}
