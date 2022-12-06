import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../interfaces/interfaces';

@Component({
  selector: 'app-select-activity',
  templateUrl: './select-activity.page.html',
  styleUrls: ['./select-activity.page.scss'],
})
export class SelectActivityPage implements OnInit {

  habilitado=true;
  activities: Activity[]=[];
  textoBuscar:'';

  constructor(
    private modalCtrl:ModalController,
    private activitiesService:ActivitiesService
  ) { }

  ngOnInit() {
    this.siguientes(null,true);
  }

  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.activities=[];
  }

  siguientes(event?, pull:boolean=false){
    this.activitiesService.getActivities(pull, this.textoBuscar)
      .subscribe( resp=>{
        this.activities.push(...resp.data);
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

  selectActivity(activity){
    this.modalCtrl.dismiss(activity);
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.activities=[];
    this.siguientes(null,true);
  }

}
