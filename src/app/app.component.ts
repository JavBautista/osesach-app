import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navController: NavController,
    private platform: Platform
  ) {
    this.platform.ready().then(()=> {
      let loged = localStorage.getItem('token');
      if(loged) { this.navController.navigateRoot(['tabs']); } else { this.navController.navigateRoot('login ')}
    }).catch(()=> {
      this.navController.navigateRoot('/login')
    })
  }
}
