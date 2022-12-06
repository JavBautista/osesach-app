import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Visit } from 'src/app/interfaces/interfaces';
import { Directory } from '../../interfaces/interfaces';


@Component({
  selector: 'app-view-visit',
  templateUrl: './view-visit.page.html',
  styleUrls: ['./view-visit.page.scss'],
})
export class ViewVisitPage implements OnInit {

  @Input() visit:Visit;

  directory:Directory;
  


  constructor(
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
    this.directory = this.visit.directory;
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }
}
