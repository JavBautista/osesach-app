import { Component, OnInit, Input } from '@angular/core';
import { UserPhoto } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-directory-image',
  templateUrl: './directory-image.page.html',
  styleUrls: ['./directory-image.page.scss'],
})
export class DirectoryImagePage implements OnInit {

  @Input() photo: UserPhoto;
  @Input() src_image:String;
  @Input() existe_image:Number;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

}
