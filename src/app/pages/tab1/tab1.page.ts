import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AgenteVisitasPage } from '../agente-visitas/agente-visitas.page';
import { DirectoryCreatePage } from '../directory-create/directory-create.page';
import { SearchPage } from '../search/search.page';
import { AgenteDirectoryPage } from '../agente-directory/agente-directory.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  tipo_usuario=3;
  usuario:Usuario={};
  
  

  constructor(
    
    private toastController: ToastController,
    private modalCtrl:ModalController,
    private usuarioService:UsuarioService
  ) {}

  ngOnInit(){

    this.usuario= this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async openPage(option){
    let page=null;
    if(option=='agente-visitas') page = AgenteVisitasPage;
    if(option=='agente-directory') page = AgenteDirectoryPage;
    if(option=='nueva-direccion') page = DirectoryCreatePage;
    if(option=='buscar') page = SearchPage;


    console.log('Abrir '+option);
    const modal = await this.modalCtrl.create({
      component: page,      
    });
    await modal.present();
  }

  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }//.presentToast()


  
}
