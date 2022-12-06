import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DirectoriesService } from 'src/app/services/directories.service';
import { SelectActivityPage } from '../select-activity/select-activity.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-directory-create',
  templateUrl: './directory-create.page.html',
  styleUrls: ['./directory-create.page.scss'],
})
export class DirectoryCreatePage implements OnInit {

  new_directory={
    nombre_unidad:'',
    codigo_scian:'',
    nombre_clase_actividad:'',
    descripcion_estrato_personal_ocupado:'',
    nombre_vialidad:'',
    numero_exterior_o_kilometro:'',
    nombre_asentamiento_humano:'',
    codigo_postal:'',
    numero_telefono:'',
    correo_electronico:'',
    sitio_internet:'',
    latitud:0,
    longitud:0,
  }

  constructor(
    private modalCtrl:ModalController,
    private directoriesService:DirectoriesService,
    private toastController: ToastController,
    private alertController:AlertController,
    private geolocation:Geolocation,
  ) { }

  ngOnInit() {

    this.getGeo();

    this.directoriesService.newDirectory
        .subscribe(directory=>{
          console.log(directory);
          this.presentToast("Creado correctamente.");
        });

  }

  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  async saveNewDirectory(){    
    await this.directoriesService.storeDirectory(this.new_directory);
    this.modalCtrl.dismiss();
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  async seleccionarActividad(){
    const modal = await this.modalCtrl.create({
      component: SelectActivityPage
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();
    if(data){
      this.new_directory.codigo_scian=data['key'];
      this.new_directory.nombre_clase_actividad=data['activity'];
    }
  }

  async selectNumeroPersonal() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'VISITA',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '0-5 personas',
          value: '0-5 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='0-5 personas';
          }
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '6-10 personas',
          value: '6-10 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='6-10 personas';
          },
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '11-30 personas',
          value: '11-30 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='11-30 personas';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '31-50 personas',
          value: '31-50 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='31-50 personas';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '51-100 personas',
          value: '51-100 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='51-100 personas';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '101-250 personas',
          value: '101-250 personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='101-250 personas';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '251 y más personas',
          value: '251 y más personas',
          handler: () => {
            this.new_directory.descripcion_estrato_personal_ocupado='251 y más personas';
          },
          
        },
        
      ],
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        }
      ],
    });    
    await alert.present();
  }

  getGeo(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.new_directory.latitud  = resp.coords.latitude;
      this.new_directory.longitud = resp.coords.longitude;
        console.log(this.new_directory.latitud);
        console.log(this.new_directory.longitud);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

}
