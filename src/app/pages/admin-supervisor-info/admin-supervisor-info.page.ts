import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DirectoriesService } from 'src/app/services/directories.service';
import { Persona } from '../../interfaces/interfaces';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { environment } from '../../../environments/environment';
const URL= environment.url;
@Component({
  selector: 'app-admin-supervisor-info',
  templateUrl: './admin-supervisor-info.page.html',
  styleUrls: ['./admin-supervisor-info.page.scss'],
})
export class AdminSupervisorInfoPage implements OnInit {
  
  @Input() persona: Persona;
  src_image='';
  existe_image=0;

  constructor(
    private modalCtrl:ModalController,
    private directoriesService:DirectoriesService,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
    console.log(this.persona)

    if(this.persona.image){
      this.existe_image=1;
      this.src_image = `${URL}/storage/${this.persona.image}`;
    }

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
