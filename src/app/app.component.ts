import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navController: NavController
  ) {}

  ionViewWillEnter(){
   let loged = localStorage.getItem('token');
   if(loged) { this.navController.navigateRoot(['tabs']); } else { this.navController.navigateRoot('login ')}
  }
}
