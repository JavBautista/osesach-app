import { Component, OnInit } from '@angular/core';
//import { UserPhoto, Usuario } from 'src/app/interfaces/interfaces';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DirectoriesService } from '../../services/directories.service';
//import { PhotoService } from '../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';




@Component({
  selector: 'app-tab0',
  templateUrl: 'tab0.page.html',
  styleUrls: ['tab0.page.scss'],
})
export class Tab0Page implements OnInit {

  usuario:Usuario={};
  porcentaje_progressbar:number=0;
  asignadas:number=0;
  trabajadas:number=0;
  faltantes:number=0;
  porcentaje_avance:number=0;
  
  constructor(
    private usuarioService:UsuarioService,
    private directoriesService:DirectoriesService,
    //public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) { }

  async ngOnInit() {

    this.usuario= this.usuarioService.getUsuario();
    console.log(this.usuario);

    this.getAvanceAgente();
  
    //await this.photoService.loadSaved();
  }

  async getAvanceAgente(){

    await this.directoriesService.getResumenAvanceAgente(this.usuario.person_id)
          .subscribe( resp=>{
            console.log(resp);
            this.porcentaje_progressbar= resp['value_progress_bar'];
            this.asignadas= resp['asignadas'];
            this.trabajadas= resp['trabajadas'];
            this.faltantes= resp['faltantes'];
            this.porcentaje_avance= resp['porcentaje_avance'];
            //this.directories.push(...resp.data);    
          });

  }

  /*
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      },
      {
        text: 'Upload ',
        icon: 'cloud-upload',
        handler: () => {
          this.photoService.uploadPicture(photo);
        }
      }
      , {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }*/



  

}
