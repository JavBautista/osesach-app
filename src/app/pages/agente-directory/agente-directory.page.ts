import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DirectoryPage } from '../directory/directory.page';
import { Directory } from '../../interfaces/interfaces';
import { DirectoriesService } from '../../services/directories.service';
import { PhotoService } from '../../services/photo.service';


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
    private modalCtrl:ModalController,
    private photoService:PhotoService

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

      this.presentToast("Visita guardada.");
    });

    this.directoriesService.storeNewImage
        .subscribe(directory=>{
          console.log('New Image Emmit');
          console.log(directory);
          let index =this.directories.findIndex(s => s.id == directory.id);
          this.directories[index].image = directory.image;
          this.presentToast("Imagen gurdada correctamente.");
        });
    
    this.directoriesService.deleteDirectoryImage
          .subscribe(directory=>{
            console.log('Delete Image Emmit');
            console.log(directory);
            let index =this.directories.findIndex(s => s.id == directory.id);
            this.directories[index].image = directory.image;          
            this.presentToast("Imagen eliminada correctamente.");
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
