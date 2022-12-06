import { Component, Input, OnInit } from '@angular/core';
import { VisitsService } from '../../services/visits.service';
import { Visit, Directory } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ViewVisitPage } from '../view-visit/view-visit.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

declare var mapboxgl: any;
declare var MapboxDirections: any;

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

  constructor(
    private modalCtrl:ModalController,
    private visitsService:VisitsService,
    private launchNavigator:LaunchNavigator,
    ) { }

  ngOnInit() {
    this.siguientes(null,true);
    
    console.log(this.directory)

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
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS,
        };


    this.launchNavigator.navigate(this.destino,options).then((res)=>{
      console.log(res);
    },(err)=>{
      console.log(JSON.stringify(err));
    })
  }

}
