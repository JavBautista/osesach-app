import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Directory } from 'src/app/interfaces/interfaces';
import { DirectoriesService } from 'src/app/services/directories.service';
import { DirectoryPage } from '../directory/directory.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  textoBuscar:'';
  directories:Directory[]=[];
  constructor(
    private modalCtrl:ModalController,
    private directoriesService:DirectoriesService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {

    this.directoriesService.sessionFailed
      .subscribe(()=>{
        console.log(' Emmit SesionFailed');            
        this.presentToast("Session perdida, inicie de sesion de nuevo.");
      });
  }

  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.directories=[];
    if(this.textoBuscar != ''){

      this.getDirectories();
    }
  }

  getDirectories(){

    this.directoriesService.getSearchDirectories(this.textoBuscar)
      .subscribe( resp=>{
        console.log(resp)
        this.directories.push(...resp.data);       
      });

  }

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

}
