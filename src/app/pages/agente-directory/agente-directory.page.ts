import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DirectoryPage } from '../directory/directory.page';
import { Directory } from '../../interfaces/interfaces';
import { DirectoriesService } from '../../services/directories.service';


@Component({
  selector: 'app-agente-directory',
  templateUrl: './agente-directory.page.html',
  styleUrls: ['./agente-directory.page.scss'],
})
export class AgenteDirectoryPage implements OnInit {
  visitados:boolean=false;
  habilitado=true;
  textoBuscar:'';

  directories: Directory[]=[];  

  constructor(
    private directoriesService:DirectoriesService,
    private toastController: ToastController,
    private modalCtrl:ModalController

  ) { }

  ngOnInit() {

    this.siguientes(null,true);
    
    this.directoriesService.newVisita
    .subscribe(visit=>{
      console.log('Nueva visita');
      console.log(visit);
      let dir=visit.directory;

      let index =this.directories.findIndex(s => s.id == dir.id);

      this.directories[index].status_id = dir.status_id;

      this.presentToast("Visita guardada guardada.");
    });
    
  }

  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.directories=[];
  }


  async siguientes(event?, pull:boolean=false){
    this.directoriesService.getDirectoriesAgent(this.visitados,pull, this.textoBuscar)
      .subscribe( resp=>{
        this.directories.push(...resp.data);
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

 

  async selectDiretory(directory){
    console.log('Abrir direccion')
    const modal = await this.modalCtrl.create({
      component: DirectoryPage,
      componentProps:{
        directory:directory
        
      }
    });
    await modal.present();

  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.directories=[];
    this.siguientes(null,true);
  }

}
