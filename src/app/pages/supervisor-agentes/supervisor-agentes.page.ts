import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/interfaces';
import { PersonalService } from 'src/app/services/personal.service';
import { SupervisorAgenteAvancePage } from '../supervisor-agente-avance/supervisor-agente-avance.page';

@Component({
  selector: 'app-supervisor-agentes',
  templateUrl: './supervisor-agentes.page.html',
  styleUrls: ['./supervisor-agentes.page.scss'],
})
export class SupervisorAgentesPage implements OnInit {

  habilitado=true;
  personas: Persona[]=[];
  textoBuscar:'';
  
  constructor(
    private personalService:PersonalService,
    private toastController: ToastController,
    private modalCtrl:ModalController
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
    this.personalService.getAgentes(pull, this.textoBuscar)
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

  

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.personas=[];
    this.siguientes(null,true);
  }

  async openAvanceAgente(persona){

    const modal = await this.modalCtrl.create({
      component: SupervisorAgenteAvancePage,
      componentProps:{
        persona:persona
        
      }      
    });
    await modal.present();
  }

}
