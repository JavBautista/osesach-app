import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DirectoriesService } from 'src/app/services/directories.service';
import { Persona } from '../../interfaces/interfaces';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { environment } from '../../../environments/environment';
const URL= environment.url;

@Component({
  selector: 'app-supervisor-agente-avance',
  templateUrl: './supervisor-agente-avance.page.html',
  styleUrls: ['./supervisor-agente-avance.page.scss'],
})
export class SupervisorAgenteAvancePage implements OnInit {
  @Input() persona: Persona;
  src_image='';
  existe_image=0;

  porcentaje_progressbar:number=0;
  asignadas:number=0;
  trabajadas:number=0;
  faltantes:number=0;
  porcentaje_avance:number=0;


  constructor(
    private modalCtrl:ModalController,
    private directoriesService:DirectoriesService,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
    console.log(this.persona)
    this.getAvanceAgente();
    if(this.persona.image){
      this.existe_image=1;
      this.src_image = `${URL}/storage/${this.persona.image}`;
    }
  }

  async getAvanceAgente(){

    await this.directoriesService.getResumenAvanceAgente(this.persona.id)
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

  cerrar(){
    this.modalCtrl.dismiss();
  }
  call(telefono){

    this.callNumber.callNumber(telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
