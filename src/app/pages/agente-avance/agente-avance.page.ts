import { Component, Input, OnInit } from '@angular/core';
import { VisitsService } from '../../services/visits.service';
import { Visit, Directory, UserPhoto } from '../../interfaces/interfaces';
import { AlertController, ModalController } from '@ionic/angular';
import { ViewVisitPage } from '../view-visit/view-visit.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DirectoryImagePage } from '../directory-image/directory-image.page';
import { environment } from '../../../environments/environment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

declare var mapboxgl: any;
declare var MapboxDirections: any;
const URL= environment.url;

@Component({
  selector: 'app-agente-avance',
  templateUrl: './agente-avance.page.html',
  styleUrls: ['./agente-avance.page.scss'],
})
export class AgenteAvancePage implements OnInit {

  @Input() directory:Directory;
  visits: Visit[]=[];
  destino:number[]=[];

  habilitado=true;

  src_image='';
  existe_image=0;

  constructor(
    private modalCtrl:ModalController,
    private visitsService:VisitsService,
    private launchNavigator:LaunchNavigator,
    private alertController: AlertController,
    private inapp: InAppBrowser
    ) { }

  ngOnInit() {
    this.siguientes(null,true);
    
    console.log(this.directory)

    if(this.directory.image){
      this.existe_image=1;
      this.src_image = `${URL}/storage/${this.directory.image}`;
    }

    console.log(this.src_image);

    const lat = Number(this.directory.latitud)  ;
    const lng = Number(this.directory.longitud);

    this.destino  = [lat,lng];

    mapboxgl.accessToken = 'pk.eyJ1IjoiamJhdXRpc3RhIiwiYSI6ImNsYWp4eXlpbjAwcWIzb3Fzc3c2ajVmZjgifQ.zdUFVCPkZEZdvj6WZ4KTXw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[lng,lat],
      zoom:15
    });

    const marker = new mapboxgl.Marker()
          .setLngLat([lng,lat])
          .addTo(map);

    /*this.visitsService.nuevoPlan
        .subscribe(plan=>{
          this.visits.unshift(plan);
        });
    */
  }
  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.visits=[];
  }

  siguientes(event?, pull:boolean=false){

    
    this.visitsService.getVisitsDirectoryAgent(this.directory.id,pull)
      .subscribe( resp=>{
        console.log(resp)
        this.visits.push(...resp.data);
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

  async abrirVisita(visit){
    console.log('Abrir visita')
    const modal = await this.modalCtrl.create({
      component: ViewVisitPage,
      componentProps:{
        visit:visit
        
      }
    });
    await modal.present();

  }

  openNavigatorGoogleMaps(){
    const browser = this.inapp.create(`https://google.com/maps/@${this.destino[0]},${this.destino[1]}`, '_system');
    browser.show();
    // let options: LaunchNavigatorOptions = {
    //   app: this.launchNavigator.APP.USER_SELECT,
    //     };


    // this.launchNavigator.navigate(this.destino,options).then((res)=>{
    //   console.log(res);
    // },async (err)=>{
    //   console.log(JSON.stringify(err));
    //   let alert = await this.alertController.create({
    //     message:'Para poder utilizar esta función es necesario cuente con un aplicativo de mapas como Apple Maps, Google maps, etc.'
    //   });
    //   alert.present();
    // })
  }

  async viewImage(photo: UserPhoto,){
    const modal = await this.modalCtrl.create({
     component: DirectoryImagePage,
     componentProps:{
       photo:photo,
       src_image: this.src_image,
       existe_image:this.existe_image        
     }      
   });
   await modal.present();
 }
}
