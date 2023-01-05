import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DirectoriesService } from 'src/app/services/directories.service';

@Component({
  selector: 'app-supervisor-avances',
  templateUrl: './supervisor-avances.page.html',
  styleUrls: ['./supervisor-avances.page.scss'],
})
export class SupervisorAvancesPage implements OnInit {

  porcentaje_progressbar:number=0;
  totales:number=0;
  nuevas:number=0;
  asignadas:number=0;
  trabajadas:number=0;
  faltantes:number=0;
  porcentaje_avance:number=0;


  constructor(
    private directoriesService:DirectoriesService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {

    this.getAvanceGeneral();

  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  async getAvanceGeneral(){

    await this.directoriesService.getResumenAvanceGeneral()
          .subscribe( resp=>{
            console.log(resp);
            this.porcentaje_progressbar= resp['value_progress_bar'];
            this.totales= resp['totales'];
            this.nuevas= resp['nuevas'];
            this.asignadas= resp['asignadas'];
            this.trabajadas= resp['trabajadas'];
            this.faltantes= resp['faltantes'];
            this.porcentaje_avance= resp['porcentaje_avance'];
            //this.directories.push(...resp.data);    
          });

  }

}
