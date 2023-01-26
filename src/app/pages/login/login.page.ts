import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser={
    email:'',
    password:''
  };

  constructor(
      private usuarioService: UsuarioService,
      private navCtrl:NavController ,
      private uiService:UiServiceService,
      private loadingController: LoadingController
    ) { }
  ngOnInit() {
    this.loginUser.email = environment.auth.email
    this.loginUser.password = environment.auth.password
  }
  async login( fLogin:NgForm) {
    let loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    loading.present();
    if(fLogin.invalid ){  loading.dismiss(); return; }
    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);
    if(valido){
      //navegar al inicio
      this.navCtrl.navigateRoot('/tabs', {animated:true}).finally(()=> { loading.dismiss();});
    }else{
      //mostrar alerta de incorrecto
      this.uiService.alertaInformativa('Usuario y/o constraseña incorrecta.');
      loading.dismiss()
    }
  }

}
