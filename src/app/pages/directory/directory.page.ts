import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { DirectoriesService } from 'src/app/services/directories.service';
import { Directory } from '../../interfaces/interfaces';
import { VisitaActualizarPage } from '../visita-actualizar/visita-actualizar.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

declare var mapboxgl: any;
declare var MapboxDirections: any;

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {

  //const latLng = this.coords.split(',');
  //const lat = Number(this.latLng[0]);
  //const lng = Number(this.latLng[1]);
  
  @Input() directory:Directory; 

  estatus_visita='';
  comentario='';
  consulta='';
  no_personas_hombres=0;
  no_personas_mujeres=0;
  rango_edades='';
  latitud=0; 
  longitud=0;

  destino:number[]=[];
  inicio:number[]=[];

  btnEnableSave=true;


  constructor( 
      private launchNavigator:LaunchNavigator,
      private modalCtrl:ModalController,
      private actionSheetCtrl: ActionSheetController, 
      private alertController:AlertController,
      private directoriesService:DirectoriesService,
      private toastController: ToastController,
      private geolocation:Geolocation
    ) { }

  ngOnInit() {

    this.getGeo();    
    this.directoriesService.updateDirectory
          .subscribe(directory=>{
            console.log('Update Emmit');
            console.log(directory);
            this.directory.nombre_vialidad = directory.nombre_vialidad;
            this.directory.numero_exterior_o_kilometro = directory.numero_exterior_o_kilometro;
            this.directory.nombre_asentamiento_humano = directory.nombre_asentamiento_humano;
            this.directory.codigo_postal = directory.codigo_postal;
            this.directory.numero_telefono = directory.numero_telefono;
            this.directory.correo_electronico = directory.correo_electronico;
            this.directory.sitio_internet = directory.sitio_internet;
           
            this.presentToast("Actualizado correctamente.");
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

  async opciones(directory){
    console.log(directory)
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
       text: 'Actualizar informacion',
       icon: 'create-outline',
       handler: () => {
         console.log('View');
         this.abrirEdit();
                  
       }
     },     
    ]
    });
    await actionSheet.present();
  }

  async abrirEdit(){
    const modal = await this.modalCtrl.create({
      component: VisitaActualizarPage,
      componentProps:{
        directory:this.directory
        
      }      
    });
    await modal.present();
  }

  async selectEstatusVisita() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'VISITA',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'VALIDADO CORRECTAMENTE',
          value: 'VALIDADO CORRECTAMENTE',
          handler: () => {
            this.estatus_visita='VALIDADO CORRECTAMENTE';
          }
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'NEGOCIO CERRADO',
          value: 'NEGOCIO CERRADO',
          handler: () => {
            this.estatus_visita='NEGOCIO CERRADO';
          },
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'NO LOCALIZADO',
          value: 'NO LOCALIZADO',
          handler: () => {
            this.estatus_visita='NO LOCALIZADO';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'DOMICILIO INCORRECTO',
          value: 'DOMICILIO INCORRECTO',
          handler: () => {
            this.estatus_visita='DOMICILIO INCORRECTO';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'OTRO ESTABLECIMIENTO',
          value: 'OTRO ESTABLECIMIENTO',
          handler: () => {
            this.estatus_visita='OTRO ESTABLECIMIENTO';
          },
          
        },
        
      ],
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cerrar');
            //this.handlerMessage = 'Alert canceled';
          },
        }
      ],
    });    
    await alert.present();
  }

  async selectRangoEdades() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'VISITA',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Menores a 18',
          value: 'Menores a 18',
          handler: () => {
            this.rango_edades='Menores a 18';
          }
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '18 a 30 años',
          value: '18 a 30 años',
          handler: () => {
            this.rango_edades='18 a 30 años';
          },
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '31 a 40 años',
          value: '31 a 40 años',
          handler: () => {
            this.rango_edades='31 a 40 años';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: '41 a 50 años',
          value: '41 a 50 años',
          handler: () => {
            this.rango_edades='41 a 50 años';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Más de 50 años',
          value: 'Más de 50 años',
          handler: () => {
            this.rango_edades='Más de 50 años';
          },
          
        },
        
      ],
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cerrar');
            //this.handlerMessage = 'Alert canceled';
          },
        }
      ],
    });    
    await alert.present();
  }


  async opcionesConsulta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'CONSULTA',
      message: '¿De qué manera el ayuntamiento podría ayudar al desarrollo de su negocio?',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Capacitación en tema de marketing y ventas',
          value: 'Capacitación en tema de marketing y ventas',
          handler: () => {
            this.consulta='Capacitación en tema de marketing y ventas';
          }
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Orientación para apertura de negocios',
          value: 'Orientación para apertura de negocios',
          handler: () => {
            this.consulta='Orientación para apertura de negocios';
          },
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Capacitación en temas fiscales',
          value: 'Capacitación en temas fiscales',
          handler: () => {
            this.consulta='Capacitación en temas fiscales';
          },
          
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Vinculación en Bolsa de trabajo',
          value: 'Vinculación en Bolsa de trabajo',
          handler: () => {
            this.consulta='Vinculación en Bolsa de trabajo';
          },
          
        }
      ],
      buttons: [        
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            //this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });    
    await alert.present();
  }

  async guardarVisita(){

    await this.directoriesService.guardarVisita(this.directory.id, this.estatus_visita, this.comentario, this.consulta, this.no_personas_hombres, this.no_personas_mujeres, this.rango_edades,this.latitud, this.longitud);
    this.modalCtrl.dismiss();

  }

  getGeo(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.latitud  = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
        console.log(this.latitud);
        console.log(this.longitud);
        
        const lat = Number(this.directory.latitud)  ;
        const lng = Number(this.directory.longitud);

        const lng2=Number(this.longitud);
        const lat2=Number(this.latitud);

        mapboxgl.accessToken = 'pk.eyJ1IjoiamJhdXRpc3RhIiwiYSI6ImNsYWp4eXlpbjAwcWIzb3Fzc3c2ajVmZjgifQ.zdUFVCPkZEZdvj6WZ4KTXw';
        
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center:[lng,lat],
          zoom:15
        });

        map.addControl(
          new MapboxDirections({
          accessToken: mapboxgl.accessToken,          
          }),
          'top-left'
          );
        


        //map.addControl(new mapboxgl.FullscreenControl());
        //map.addControl(new mapboxgl.NavigationControl());
        //map.addControl(new mapboxgl.NavigationControl());

        const marker = new mapboxgl.Marker()
              .setLngLat([lng,lat])
              .addTo(map);

        const marker2 = new mapboxgl.Marker()
              .setLngLat([lng2,lat2])
              .addTo(map);
        
        this.inicio = [lat2,lng2];
        this.destino  = [lat,lng];

     }).catch((error) => {
       console.log('Error getting location', error);
     });

     

  }

  openNavigatorGoogleMaps(){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS,
               start:this.inicio
        };
        
    this.launchNavigator.navigate(this.destino,options).then((res)=>{
      console.log(res);
    },(err)=>{
      console.log(JSON.stringify(err));
    })
  }



}
